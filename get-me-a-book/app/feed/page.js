"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchpayments, fetchDonationsMade } from "@/actions/useractions";

export default function Feed() {
  const [users, setUsers] = useState([]);
  const [amounts, setAmounts] = useState({});
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/feed", { cache: "no-store" });
      const data = await res.json();
      const userList = Array.isArray(data.users) ? data.users : [];
      setUsers(userList);
      calculateAmounts(userList);
    })();
  }, []);

  const calculateAmounts = async (userList) => {
    const newAmounts = {};
    for (let user of userList) {
      let total = 0;
      if (user.type === "receiver") {
        const p = await fetchpayments(user.username);
        total = p.reduce((acc, pay) => acc + (pay.amount || 0), 0);
      } else {
        const d = await fetchDonationsMade(user.username);
        total = d.reduce((acc, pay) => acc + (pay.amount || 0), 0);
      }
      newAmounts[user._id] = total;
    }
    setAmounts(newAmounts);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-10">The Book Circle</h1>
      <div className="max-w-4xl mx-auto space-y-4">
        {users.length === 0 ? (
          <p className="text-center text-gray-600">No users available right now.</p>
        ) : (
          users.map(user => (
            <div
              key={user._id}
              onClick={() => router.push(`/${user.username}`)}
              className="cursor-pointer bg-white p-4 rounded-lg shadow hover:bg-gray-50 flex items-center gap-4"
            >
              <img
                src={user.profilepic || "/default-profile.jpg"}
                alt={user.username}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <p className="font-bold text-blue-700">@{user.username}</p>
                {user.type === "receiver" && <p className="text-gray-600">{user.description}</p>}
                <p className={`mt-1 font-medium ${user.type === "receiver" ? "text-green-700" : "text-purple-700"}`}>
                  💸 {user.type === "receiver" ? "Total Received" : "Total Donated"}: ₹{((amounts[user._id] || 0) / 100).toFixed(2)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Feed;
