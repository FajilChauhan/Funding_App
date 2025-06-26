import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import User from "@/models/User";
import connectDb from "@/db/connectDb";

export const POST = async (req) => {
  await connectDb();

  const formData = await req.formData();
  const body = Object.fromEntries(formData); // razorpay_order_id, razorpay_payment_id, razorpay_signature

  // Find the payment using Razorpay order ID
  const payment = await Payment.findOne({ oid: body.razorpay_order_id });
  if (!payment) {
    return NextResponse.json({ success: false, message: "Order ID not found" });
  }

  // ✅ Fetch receiver using email (since to_user is now stored as email)
  const receiver = await User.findOne({ email: payment.to_user });
  if (!receiver || !receiver.razorpaysecret) {
    return NextResponse.json({ success: false, message: "Receiver credentials not found" });
  }

  // ✅ Validate payment signature
  const isValid = validatePaymentVerification(
    {
      order_id: body.razorpay_order_id,
      payment_id: body.razorpay_payment_id,
    },
    body.razorpay_signature,
    receiver.razorpaysecret
  );

  if (isValid) {
    // ✅ Mark payment as completed
    const updatedPayment = await Payment.findOneAndUpdate(
      { oid: body.razorpay_order_id },
      { done: true },
      { new: true }
    );

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_URL}/${receiver.username}?paymentdone=true`
    );
  } else {
    return NextResponse.json({
      success: false,
      message: "Payment verification failed",
    });
  }
};
