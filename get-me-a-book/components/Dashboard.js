"use client";
import React, { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { fetchuser, updateProfile } from '@/actions/useractions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import { useCallback } from "react";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({});

  const loadUserData = async () => {
    try {
      const userData = await fetchuser(session.user.email);
      if (!userData) {
        setForm({
          name: session.user.name || "",
          email: session.user.email || "",
          username: session.user.name?.toLowerCase().replace(/\s+/g, "") || "",
          profilepic: session.user.image || "",
          coverpic: "",
          type: "donater",
          razorpayid: "",
          razorpaysecret: "",
          description: ""
        });
      } else {
        setForm(userData);
      }
    } catch (error) {
      console.error("Error loading user data:", error);
      toast.error("Failed to load user data.");
    }
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      loadUserData();
    }
  }, [status]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await updateProfile(form, session.user.name);

    if (res.success) {
      toast("✅ Profile Updated", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
    } else {
      toast.error(res.error || "Something went wrong!");
    }
  };

  if (!form || !form.email) return <div className="text-center mt-10">Loading...</div>;

  return (
    <>
      <ToastContainer />
      <div className="w-full min-h-screen bg-gray-100 px-4 py-6 text-black">
        <h1 className="text-3xl font-bold text-center mb-6">Welcome to your Dashboard</h1>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-5"
        >
          <InputField label="Name" name="name" value={form.name} onChange={handleChange} />
          <InputField label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
          <InputField label="Username" name="username" value={form.username} onChange={handleChange} />
          <InputField label="Profile Picture" name="profilepic" value={form.profilepic} onChange={handleChange} />
          <InputField label="Cover Picture" name="coverpic" value={form.coverpic} onChange={handleChange} />
          <HelperPic />

          <div className="my-2">
            <label className="block mb-2 text-sm font-medium text-black">Type</label>
            <div className="flex flex-wrap gap-4">
              {['donater', 'receiver'].map((type) => (
                <label key={type} className="flex items-center text-sm">
                  <input
                    type="radio"
                    name="type"
                    value={type}
                    checked={form.type === type}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </label>
              ))}
            </div>
          </div>

          {form.type === 'receiver' && (
            <>
              <InputField
                label="Razorpay ID"
                name="razorpayid"
                value={form.razorpayid}
                onChange={handleChange}
                required
                isImportant
              />

              <InputField
                label="Razorpay Secret"
                name="razorpaysecret"
                value={form.razorpaysecret}
                onChange={handleChange}
                required
                isImportant
              />
              <HelperText />

              <div className="my-2">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-black">
                  Why do you need this donation?
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows={4}
                  className="w-full p-3 rounded-lg bg-slate-200 focus:outline-none"
                  value={form.description || ''}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

const InputField = ({ label, name, value, onChange, type = "text", required = false, isImportant = false }) => (
  <div className="my-2 w-full">
    <label htmlFor={name} className="block mb-1 text-sm font-medium text-black">
      {label} {isImportant && <span className="text-red-600">*</span>}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      required={required}
      value={value || ''}
      onChange={onChange}
      className="block w-full p-3 rounded-lg bg-slate-200 focus:outline-none"
    />
  </div>
);

const HelperText = () => (
  <p className="text-xs text-red-600 mb-2">
    * Make sure this is your correct Razorpay <span className="font-bold">&quot;ID&quot;</span> and <span className="font-bold">&quot;KEY&quot;</span>.
  </p>
);

const HelperPic = () => (
  <p className="text-xs text-red-600 mb-2">
    * Make sure Enter Correct <span className="font-bold">&quot;URL&quot;</span> If you want to change Profile/Cover Pic.
  </p>
);

export default Dashboard;
