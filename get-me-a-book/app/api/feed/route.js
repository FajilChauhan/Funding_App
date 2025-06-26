export const dynamic = 'force-dynamic'; // ✅ Disable caching

import { NextResponse } from "next/server";
import connectDb from "@/db/connectDb";
import User from "@/models/User";
import Payment from "@/models/Payment";

export const GET = async () => {
  await connectDb();

  const users = await User.find().lean();
  const payments = await Payment.find({ done: true }).lean(); // ✅ Only completed payments

  const result = await Promise.all(users.map(async (user) => {
    let totalReceived = 0;
    let totalDonated = 0;

    if (user.type === "receiver") {
      totalReceived = payments
        .filter(p => p.to_user === user.email)
        .reduce((sum, p) => sum + p.amount, 0);
    }

    if (user.type === "donater") {
      totalDonated = payments
        .filter(p => p.from_user === user.email)
        .reduce((sum, p) => sum + p.amount, 0);
    }

    return {
      _id: user._id.toString(),
      username: user.username,
      profilepic: user.profilepic || "",
      description: user.description || "",
      type: user.type,
      totalAmount: user.type === 'receiver' ? totalReceived : totalDonated
    };
  }));

  return new Response(JSON.stringify({ users: result }), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store"
    }
  });
};
