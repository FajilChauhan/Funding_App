"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchuser, updateProfile } from "@/actions/useractions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";

const Dashboard = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [form, setForm] = useState(null); // null initially

    // Redirect to login if not authenticated
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        } else if (status === "authenticated") {
            getData();
        }
    }, [status]);

    const getData = async () => {
        const u = await fetchuser(session.user.name);
        setForm(u);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
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

    if (!form) return <div className="text-center mt-10">Loading...</div>;

    return (
        <>
            <ToastContainer />
            <div className="container mx-auto py-5 px-6">
                <h1 className="text-center my-5 text-3xl font-bold">Welcome to your Dashboard</h1>

                <form className="max-w-2xl mx-auto" onSubmit={handleSubmit}>
                    {/* Name */}
                    <InputField label="Name" name="name" value={form.name} onChange={handleChange} />

                    {/* Email */}
                    <InputField label="Email" name="email" type="email" value={form.email} onChange={handleChange} />

                    {/* Username */}
                    <InputField label="Username" name="username" value={form.username} onChange={handleChange} />

                    {/* Profile Pic */}
                    <InputField label="Profile Picture" name="profilepic" value={form.profilepic} onChange={handleChange} />

                    {/* Cover Pic */}
                    <InputField label="Cover Picture" name="coverpic" value={form.coverpic} onChange={handleChange} />

                    {/* Type */}
                    <div className="my-2">
                        <label className="block mb-2 text-sm font-medium text-black">Type</label>
                        <div className="flex gap-4">
                            {["donater", "receiver"].map((type) => (
                                <label key={type} className="flex items-center">
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

                    {/* Receiver-specific fields */}
                    {form.type === "receiver" && (
                        <>
                            <InputField label="Razorpay Id" name="razorpayid" value={form.razorpayid} onChange={handleChange} />
                            <InputField label="Razorpay Secret" name="razorpaysecret" value={form.razorpaysecret} onChange={handleChange} />

                            {/* NEW: Description box for why they need money */}
                            <div className="my-2">
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-black">
                                    Why do you need this donation?
                                </label>
                                <textarea
                                    name="description"
                                    id="description"
                                    rows={4}
                                    className="block w-full p-2 rounded-lg bg-slate-300"
                                    value={form.description || ""}
                                    onChange={handleChange}
                                />
                            </div>
                        </>
                    )}

                    {/* Submit Button */}
                    <div className="my-6">
                        <button
                            type="submit"
                            className="block w-full p-2 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

// Reusable input field component
const InputField = ({ label, name, value, onChange, type = "text" }) => (
    <div className="my-2">
        <label htmlFor={name} className="block mb-2 text-sm font-medium text-black">
            {label}
        </label>
        <input
            type={type}
            name={name}
            id={name}
            value={value || ""}
            onChange={onChange}
            className="block w-full p-2 rounded-lg bg-slate-300"
        />
    </div>
);

export default Dashboard;
