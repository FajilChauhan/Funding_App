"use server"

import Razorpay from "razorpay"
import User from "@/models/User"
import Payment from "@/models/Payment"
import connectDb from "@/db/connectDb"
import { GET } from "@/app/api/user/route"

// 1. Initiate a payment (for receivers)
export const initiate = async (amount, to_username, paymentform) => {
  await connectDb()

  const instance = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_KEY_ID,
    key_secret: process.env.KEY_SECRET,
  })

  const options = {
    amount: Number.parseInt(amount),
    currency: "INR",
  }

  const order = await instance.orders.create(options)

  await Payment.create({
    oid: order.id,
    amount: amount,
    to_user: to_username,
    name: paymentform.name,
    message: paymentform.message,
    done: false,
    email: paymentform.email || "",
    from_user: paymentform.from_user || "",
  })

  return order
}

// 2. Fetch user data by username
export const fetchuser = async (identifier) => {
  try {
    await connectDb();

    // Try by username first, fallback to email
    let user = await User.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    if (!user) return null;

    return user.toObject({ flattenObjectIds: true });
  } catch (err) {
    console.error("Fetch user failed:", err);
    return null;
  }
};

// 3. Fetch payments *received* (to this receiver)
export const fetchpayments = async (username) => {
  await connectDb()
  const p = await Payment.find({ to_user: username, done: true })
    .sort({ amount: -1 })
    .lean()
  return p
}

// 4. Fetch payments *made* by this donater
export const fetchDonationsMade = async (username) => {
  await connectDb()
  const p = await Payment.find({ from_user: username, done: true })
    .sort({ createdAt: -1 })
    .lean()
  return p
}

// 5. Update user profile (name, email, username, description, etc.)
export const updateProfile = async (formData, originalUsername) => {
  await connectDb();

  const existingUser = await User.findOne({ username: originalUsername });
  if (!existingUser) return { success: false, error: "User not found" };

  if (formData.username !== originalUsername) {
    const usernameTaken = await User.findOne({ username: formData.username });
    if (usernameTaken) return { success: false, error: "Username already taken" };
  }

  if (formData.type === "receiver" && (!formData.razorpayid || !formData.razorpaysecret)) {
    return { success: false, error: "Receiver must provide Razorpay credentials" };
  }

  Object.assign(existingUser, {
    name: formData.name,
    email: formData.email,
    username: formData.username,
    type: formData.type,
    profilepic: formData.profilepic || "https://insidetime.org/wp-content/uploads/2021/10/Handing-in-books.jpg",
    coverpic: formData.coverpic || "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?fit=crop&w=1350&q=80",
    description: formData.description || "",
    razorpayid: formData.type === "receiver" ? formData.razorpayid : undefined,
    razorpaysecret: formData.type === "receiver" ? formData.razorpaysecret : undefined,
  });

  await existingUser.save();
  return { success: true };
};
