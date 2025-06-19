// /app/api/feed/route.js
import { NextResponse } from "next/server";
import connectDb from "@/db/connectDb";
import User from "@/models/User";
import { fetchpayments } from "@/actions/useractions";

export const GET = async () => {
  await connectDb();
  const users = await User.find().lean();

  const result = await Promise.all(
    users.map(async (user) => {
      let total = 0;
      if (user.type === "receiver") {
        const payments = await fetchpayments(user.username);
        total = payments.reduce((sum, p) => sum + p.amount, 0);
      }

      return {
        _id: user._id.toString(),
        username: user.username,
        profilepic: user.profilepic || "",
        description: user.description || "",
        type: user.type,
        totalAmount: total,
      };
    })
  );

  return NextResponse.json(result);
};
