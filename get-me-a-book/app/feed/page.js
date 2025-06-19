"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Feed = () => {
  const [users, setUsers] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/feed");
      const data = await res.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleClick = (username) => {
    if (!session) {
      alert("Login required to view profiles.");
      return;
    }
    router.push(`/${username}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4 text-black">
      <h1 className="text-3xl font-bold text-center mb-10">User Feed</h1>
      <div className="max-w-5xl mx-auto space-y-6">
        {users.length === 0 ? (
          <p className="text-center text-gray-600">No users available right now.</p>
        ) : (
          users.map((user) => (
            <div
              key={user._id}
              onClick={() => handleClick(user.username)}
              className="cursor-pointer bg-white border border-gray-200 rounded-lg shadow-md p-5 flex gap-4 items-center hover:bg-gray-50"
            >
              <img
                src={user.profilepic || "/default-profile.jpg"}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <p className="font-bold text-lg text-blue-700">@{user.username}</p>
                <p className="text-gray-600 text-sm mb-2">
                  {user.description || "No description."}
                </p>
                <p className={`font-semibold ${user.type === "receiver" ? "text-green-700" : "text-purple-700"}`}>
                  {user.type === "receiver"
                    ? `Total Received: ₹${user.totalAmount / 100}`
                    : "Donater Account"}
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
