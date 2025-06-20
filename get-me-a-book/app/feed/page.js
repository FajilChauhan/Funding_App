"use client";

import { useEffect, useState } from "react"; 
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Feed = () => {
  const [users, setUsers] = useState([]); 
  const { data: session } = useSession(); 
  const router = useRouter();

useEffect(() => { const fetchUsers = async () => { 
  const res = await fetch("/api/feed", { cache: "no-store" }); // ✅ no caching const data = await res.json();

if (data && Array.isArray(data.users)) {
    const updatedUsers = data.users.map(user => {
      const totalAmount = user.type === "receiver" ? user.totalReceived : user.totalDonated;
      return { ...user, totalAmount };
    });
    setUsers(updatedUsers);
  }
};

fetchUsers();

}, []);

const handleClick = (username) => { 
  router.push(/${username});
};

return ( 
  <div className="bg-gray-100 min-h-screen py-10 px-4 text-black">
  <h1 className="text-3xl font-bold text-center mb-10">The Book Circle</h1>
  <div className="max-w-6xl mx-auto grid grid-cols-1 gap-6"> 
   {users.length === 0 ? 
  ( <p className="text-center text-gray-600 col-span-full">
  No users available right now.</p> ) : 
  ( users.map((user) => ( 
    <div key={user._id} onClick={() => handleClick(user.username)} className="cursor-pointer bg-white border border-gray-200 rounded-lg shadow-md p-4 flex flex-col sm:flex-row gap-4 items-center hover:bg-gray-50" >
  <img src={user.profilepic || "/default-profile.jpg"} alt="Profile" className="w-20 h-20 rounded-full object-cover" />
  <div className="text-center sm:text-left"> 
  <p className="font-bold text-lg text-blue-700 break-words">@{user.username}</p> {user.type === "receiver" && ( <p className="text-gray-600 text-sm">{user.description || "No description provided."}</p> )} 
  <p className={mt-1 font-medium ${user.type === "receiver" ? "text-green-700" : "text-purple-700"}}> 💸 {user.type === "receiver" ? "Total Received" : "Total Donated"}: ₹{(user.totalAmount || 0) / 100} </p>
  </div> 
  </div> )) )} 
  </div> 
  </div> ); };

export default Feed;


