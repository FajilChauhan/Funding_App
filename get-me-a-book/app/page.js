"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { fetchpayments, fetchDonationsMade } from "@/actions/useractions";
import { useCallback } from 'react';
import Image from "next/image";

const fetchFeed = async () => {
  const res = await fetch("/api/feed");
  const data = await res.json();

  if (!data || !data.users) return [];

  const usersWithAmounts = await Promise.all(
    data.users.slice(0, 2).map(async (user) => {
      let totalAmount = 0;

      if (user.type === "receiver") {
        const payments = await fetchpayments(user.email);
        totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);
      } else if (user.type === "donater") {
        const donations = await fetchDonationsMade(user.email);
        totalAmount = donations.reduce((sum, p) => sum + p.amount, 0);
      }

      return {
        ...user,
        totalAmount,
      };
    })
  );

  return usersWithAmounts;
};

const fetchLeaderboard = async () => {
  const res = await fetch("/api/feed");
  const data = await res.json();
  if (!data || !data.users) return [];

  const donaters = data.users.filter((user) => user.type === "donater");

  const leaderboardData = await Promise.all(
    donaters.map(async (user) => {
      const donations = await fetchDonationsMade(user.email);
      const total = donations.reduce((acc, p) => acc + p.amount, 0);

      return {
        _id: user._id,
        username: user.username,
        profilepic: user.profilepic || "/default-profile.jpg",
        totalDonated: total,
      };
    })
  );

  return leaderboardData
    .sort((a, b) => b.totalDonated - a.totalDonated)
    .slice(0, 5);
};

export default function Home() {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetchFeed().then(setUsers);
    fetchLeaderboard().then(setLeaderboard);
  }, []);

  const handleProfileClick = (username) => {
    window.location.href = `/${username}`;
  };

  return (
    <div className="bg-gray-100 min-h-screen text-black">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center gap-4 py-8 px-4 md:px-6 text-center">
        <div className="font-bold text-3xl md:text-5xl flex items-center justify-center">
          <span className="mx-2">Buy Me a Book</span>
          <Image src="book.webp" width={45} className="w-[45px] md:w-[55px]" alt="Logo" />
        </div>
      </div>

      {/* Feed Section */}
      <div className="w-full py-6 px-4">
        <div className="max-w-5xl mx-auto grid gap-6">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white border border-gray-300 rounded-lg p-4 shadow flex flex-col sm:flex-row gap-4 items-center cursor-pointer hover:bg-gray-50"
              onClick={() => handleProfileClick(user.username)}
            >
              <Image
                src={user.profilepic || "/default-profile.jpg"}
                alt="User"
                className="w-20 h-20 rounded-full object-cover"
              />
              <div className="flex flex-col text-center sm:text-left">
                <span className="text-lg font-semibold text-blue-600">@{user.username}</span>
                {user.type === "receiver" && (
                  <p className="text-gray-600 text-sm">{user.description || "No description provided."}</p>
                )}

                <p className={`mt-1 font-medium ${user.type === "receiver" ? "text-green-700" : "text-purple-700"}`}>
                  💸 {user.type === "receiver" ? "Total Received" : "Total Donated"}: ₹{(user.totalAmount || 0) / 100}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <Link href="/feed">
            <button
              type="button"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg md:text-xl px-10 md:px-20 py-3 md:py-4"
            >
              See More
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-black h-1 opacity-10 my-8" />

      {/* Leaderboard Section */}
      <div className="w-full py-10 bg-gray-100 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Meet the Helpers 🧡</h2>
        <div className="max-w-5xl mx-auto space-y-4 grid gap-6 bg-white">
          {leaderboard.map((user, index) => (
            <div
              key={user._id}
              className="bg-white border border-gray-300 rounded-lg p-4 shadow flex flex-col sm:flex-row gap-4 items-center cursor-pointer hover:bg-gray-50"
              onClick={() => handleProfileClick(user.username)}
            >
              <span className="font-bold text-xl">#{index + 1}</span>
              <Image
                src={user.profilepic}
                alt="Donater"
                className="w-20 h-20 rounded-full object-cover"
              />
              <div className="flex flex-col text-center sm:text-left">
                <span className="font-semibold text-blue-700">@{user.username}</span>
                <span className="text-purple-700">Total Donated: ₹{user.totalDonated / 100}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-black h-1 opacity-10 my-8" />

      {/* About Us Section */}
      <div className="w-full flex flex-col items-center justify-center px-4 mb-16">
        <h1 className="text-3xl font-bold text-center my-4">About Us</h1>

        <div className="w-full max-w-5xl bg-white p-6 rounded-lg shadow-md border border-gray-200 text-base">
          <p className="mb-4">
            <strong>GetMe-A-Book</strong> is a crowdfunding platform dedicated to helping people access the books they need for education. Our platform allows you to become a <strong>receiver</strong> to raise funds or a <strong>donater</strong> to support others.
          </p>
          <p className="mb-4">
            If you are part of an NGO, you can also create an account and raise funds as a receiver. Or, if you want to donate as an organization, you are welcome to be a supporter.
          </p>
          <p className="mb-4">
            Our platform is designed for people who want to help those around them. If you know someone nearby who needs help buying a book but you do not have enough funds yourself, you can also raise money on their behalf using our app. It is all about your effort.
          </p>
          <p className="mb-4">
            We believe every donation makes a difference. That is why we have built a <strong>leaderboard</strong> that highlights the best donors of the month. The top supporter even gets a small gift from our team — to say thank you for making the world better.
          </p>
          <p>
            To start receiving donations, you will need to set up a Razorpay account with your <strong>Razorpay ID</strong> and <strong>Razorpay Secret Key</strong>. You can watch this quick guide to help you:
          </p>

          <div className="my-4">
            <a
              href="https://www.youtube.com/watch?v=7TX7DErMvVE"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 underline font-semibold"
            >
              ▶️ Watch: How to Create Razorpay ID and Secret
            </a>
          </div>

          <div className="my-2">
            <a
              href="https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/build-integration/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 underline"
            >
              📘 Razorpay Setup Documentation
            </a>
          </div>
        </div>
      </div>

      <div className="bg-black h-1 opacity-10 my-8" />

      {/* Contact Us Section */}
      <div className="w-full flex flex-col items-center justify-center px-4 mb-16 text-black">
        <h1 className="text-3xl font-bold text-center mb-6">Contact Us</h1>
        <div className="w-full max-w-xl bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center">
          <p className="mb-2">📞 Get-Me-A-Book Help-Line: <span className="text-blue-900 font-semibold">8866430415</span></p>
          <p className="mb-2">📧 Email: <span className="text-blue-900 font-semibold">support@getmeabook.in</span></p>
          <p>📱 Instagram: <span className="text-blue-900 font-semibold">getmeabook_27.12</span></p>
        </div>
      </div>
    </div>
  );
}
