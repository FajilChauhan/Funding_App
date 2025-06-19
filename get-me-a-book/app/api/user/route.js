// app/api/user/route.js
import { NextResponse } from "next/server";
import connectDb from "@/db/connectDb";
import User from "@/models/User";

// GET: Fetch user by email
export async function GET(request) {
  try {
    await connectDb();
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });

    const user = await User.findOne({ email });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json(user);
  } catch (err) {
    console.error("GET /api/user error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST: Create or update user
export async function POST(request) {
  try {
    await connectDb();
    const body = await request.json();
    const { email } = body;

    if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });

    const user = await User.findOneAndUpdate({ email }, body, {
      upsert: true,
      new: true,
      runValidators: true
    });

    return NextResponse.json({ success: true, user });
  } catch (err) {
    console.error("POST /api/user error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
