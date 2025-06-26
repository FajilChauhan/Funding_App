"use server";

import Razorpay from "razorpay";
import User from "@/models/User";
import Payment from "@/models/Payment";
import connectDb from "@/db/connectDb";
import { useCallback } from 'react';

// 1. Initiate a payment (for receivers)
export const initiate = async (amount, to_username, paymentform) => {
  await connectDb();

  // 🔍 Get the receiver user by username
  const receiver = await User.findOne({ username: to_username });

  if (!receiver || !receiver.razorpayid || !receiver.razorpaysecret) {
    throw new Error("Receiver has not set up Razorpay credentials");
  }

  const instance = new Razorpay({
    key_id: receiver.razorpayid,
    key_secret: receiver.razorpaysecret,
  });

  const options = {
    amount: Number.parseInt(amount),
    currency: "INR",
  };

  const order = await instance.orders.create(options);

  // ✅ Store emails instead of usernames
  await Payment.create({
    oid: order.id,
    amount: amount,
    to_user: receiver.email, // receiver's email
    name: paymentform.name,
    message: paymentform.message,
    done: false,
    email: paymentform.email || "",
    from_user: paymentform.from_user || "", // sender's email
  });

  return order;
};

// 2. Fetch user data by username OR email
export const fetchuser = async (identifier) => {
  try {
    await connectDb();

    const user = await User.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    if (!user) return null;

    return user.toObject({ flattenObjectIds: true });
  } catch (err) {
    console.error("Fetch user failed:", err);
    return null;
  }
};

// 3. Fetch payments *received* by receiver (based on email)
export const fetchpayments = async (receiverEmail) => {
  await connectDb();
  const payments = await Payment.find({ to_user: receiverEmail, done: true })
    .sort({ amount: -1 })
    .lean();
  return payments;
};

// 4. Fetch payments *made* by donater (based on email)
export const fetchDonationsMade = async (donaterEmail) => {
  await connectDb();
  const donations = await Payment.find({ from_user: donaterEmail, done: true })
    .sort({ createdAt: -1 })
    .lean();
  return donations;
};

// 5. Update user profile
export const updateProfile = async (formData, originalUsername) => {
  await connectDb();

  const existingUser = await User.findOne({ username: originalUsername });
  if (!existingUser) return { success: false, error: "User not found" };

  // Prevent duplicate usernames
  if (formData.username !== originalUsername) {
    const usernameTaken = await User.findOne({ username: formData.username });
    if (usernameTaken) return { success: false, error: "Username already taken" };
  }

  // If receiver, ensure Razorpay info is filled
  if (formData.type === "receiver" && (!formData.razorpayid || !formData.razorpaysecret)) {
    return { success: false, error: "Receiver must provide Razorpay credentials" };
  }

  // Apply updates
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
