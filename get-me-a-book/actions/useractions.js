"use server"
import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import connectDb from "@/db/connectDb"

export const initiate = async (amount, to_username, paymentform) => {
    await connectDb();

    const instance = new Razorpay({
        key_id: process.env.NEXT_PUBLIC_KEY_ID,
        key_secret: process.env.KEY_SECRET
    });

    const options = {
        amount: Number.parseInt(amount),
        currency: "INR",
    };

    const order = await instance.orders.create(options);

    await Payment.create({
        oid: order.id,
        amount: amount,
        to_user: to_username,
        name: paymentform.name,
        message: paymentform.message
    });

    return order;
}
