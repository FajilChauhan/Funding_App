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
      let totalReceived = 0;
      let totalDonated = 0;

      const payments = await fetchpayments(user.username);

      if (user.type === "receiver") {
        totalReceived = payments.reduce((sum, p) => sum + p.amount, 0);
      }

      if (user.type === "donater") {
        totalDonated = payments
          .filter((p) => p.from_user === user.username)
          .reduce((sum, p) => sum + p.amount, 0);
      }

      return {
        _id: user._id.toString(),
        username: user.username,
        profilepic: user.profilepic || "",
        description: user.description || "",
        type: user.type,
        totalReceived,
        totalDonated,
      };
    })
  );

  return NextResponse.json({ users: result }); // ✅ Return the enriched `result`
};
