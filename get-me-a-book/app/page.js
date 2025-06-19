"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { fetchpayments } from "@/actions/useractions";

const fetchFeed = async () => {
  const res = await fetch("/api/feed");
  const data = await res.json();
  if (!data || !data.users) return [];
  return data.users.slice(0, 2);
};

const fetchLeaderboard = async () => {
  const res = await fetch("/api/feed");
  const data = await res.json();
  if (!data || !data.users) return [];

  const donaters = data.users.filter((user) => user.type === "donater");

  const leaderboardData = await Promise.all(
    donaters.map(async (user) => {
      const donations = await fetchpayments(user.username);
      const total = donations.reduce((acc, p) => acc + p.amount, 0);
      return {
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
    if (!session) {
      alert("Login required to view profiles.");
      return;
    }
    window.location.href = `/${username}`;
  };

  return (
    <div className="bg-gray-100 min-h-screen text-black">
      {/* Hero Section */}
      <div className="flex justify-center flex-col gap-4 items-center py-20">
        <div className="font-bold text-5xl flex justify-center items-center">
          <span className="mx-4">Buy Me a Book</span>
          <img src="book.webp" width={55} alt="Logo" />
        </div>
        <p className="text-center max-w-xl">
          A crowdfunding platform for those who are not able to buy a book.
          Let’s take part in helping a child continue their education. Start now!
        </p>
      </div>

      {/* Feed Section */}
      <div className="w-full py-10">
        <h2 className="text-xl font-bold text-center mb-8">Live Feed</h2>
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white border border-gray-300 rounded-lg p-4 shadow flex gap-4 items-center cursor-pointer hover:bg-gray-50"
              onClick={() => handleProfileClick(user.username)}
            >
              <img
                src={user.profilepic || "/default-profile.jpg"}
                alt="User"
                className="w-20 h-20 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-blue-600">@{user.username}</span>
                <p className="text-gray-600 text-sm">{user.description || "No description provided."}</p>
                <p className="text-green-700 font-medium mt-1">💸 Received: ₹{user.totalReceived || 0}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <Link href="/feed">
            <button
              type="button"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl px-20 py-4"
            >
              See More
            </button>
          </Link>
        </div>
      </div>

      {/* Leaderboard Section */}
      <div className="w-full py-10 bg-white">
        <h2 className="text-2xl font-bold text-center mb-8">Top Donaters</h2>
        <div className="max-w-3xl mx-auto px-4 space-y-4">
          {leaderboard.map((user, index) => (
            <div
              key={user.username}
              className="flex items-center gap-4 p-4 border rounded-lg shadow"
            >
              <span className="font-bold text-xl w-6">#{index + 1}</span>
              <img
                src={user.profilepic}
                alt="Donater"
                className="w-14 h-14 rounded-full object-cover"
              />
              <div className="flex flex-col">
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

        <div className="w-full max-w-5xl bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <p className="mb-4 text-lg">
            <strong>GetMe-A-Book</strong> is a crowdfunding platform dedicated to helping people access the books they need for education.
            Whether you're a student or an NGO, our platform allows you to become a <strong>receiver</strong> to raise funds or a <strong>donater</strong> to support others.
          </p>

          <p className="mb-4 text-lg">
            If you are part of an NGO, you can also create an account and raise funds as a receiver. Or, if you want to donate as an organization, you’re welcome to be a supporter.
          </p>

          <p className="mb-4 text-lg">
            Our platform is designed for people who want to help those around them. If you know someone nearby who needs help buying a book but you don't have enough funds yourself, you can also raise money on their behalf using our app. It’s all about your effort, your words, and your story.
          </p>

          <p className="mb-4 text-lg">
            We believe every donation makes a difference. That’s why we’ve built a <strong>leaderboard</strong> that highlights the best donors of the month. The top supporter even gets a small gift from our team — to say thank you for making the world better.
          </p>

          <p className="text-lg">
            To start receiving donations, you’ll need to set up a Razorpay account with your <strong>Razorpay ID</strong> and <strong>Razorpay Secret Key</strong>. You can watch this quick guide to help you:
          </p>

          <div className="my-4">
            <a
              href="https://www.youtube.com/watch?v=2p5N_F_77Uc"
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

      {/* Contact Us Section */}
      <div className="w-full flex flex-col items-center justify-center px-4 mb-16 text-black">
        <h1 className="text-3xl font-bold text-center mb-6">Contact Us</h1>
        <div className="w-full max-w-xl bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center">
          <p className="mb-2">📞 Get-Me-A-Book Help-Line: <span className="text-blue-900 font-semibold">9016199590</span></p>
          <p className="mb-2">📧 Email: <span className="text-blue-900 font-semibold">support@getmeabook.in</span></p>
          <p>📱 Instagram: <span className="text-blue-900 font-semibold">getmeabook_27.12</span></p>
        </div>
      </div>
    </div>
  );
}
