"use server"

import Razorpay from "razorpay"
import User from "@/models/User"
import Payment from "@/models/Payment"
import connectDb from "@/db/connectDb"

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
export const fetchuser = async (username) => {
  await connectDb()
  const u = await User.findOne({ username: username })
  return u?.toObject({ flattenObjectIds: true }) || null
}

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
export const updateProfile = async (data, oldusername) => {
    await connectDb();

    // Check if username is changing
    if (oldusername !== data.username) {
        const existing = await User.findOne({ username: data.username });
        if (existing) return { error: "Username already exists" };
    }

    const result = await User.updateOne({ username: oldusername }, data); // ✅ safer
    console.log("Updated User:", result);

    return { success: true };
};