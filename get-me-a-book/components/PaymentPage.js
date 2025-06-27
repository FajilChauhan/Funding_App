"use client";

import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import { useSession } from 'next-auth/react';
import { fetchuser, fetchpayments, fetchDonationsMade, initiate } from '@/actions/useractions';
import { useSearchParams, useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';

const PaymentPage = ({ username }) => {
    const [paymentform, setPaymentform] = useState({ name: "", message: "", amount: "" });
    const [currentUser, setCurrentUser] = useState(null);
    const [payments, setPayments] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const searchParams = useSearchParams();
    const router = useRouter();
    const { data: session } = useSession();

    const handleChange = (e) => setPaymentform({ ...paymentform, [e.target.name]: e.target.value });

    useEffect(() => {
        const loadData = async () => {
            try {
                const u = await fetchuser(username);
                if (!u) return toast.error("User not found");

                setCurrentUser(u);
                let txns = [], total = 0;

                if (u.type === "receiver") {
                    txns = await fetchpayments(u.email);
                } else if (u.type === "donater") {
                    txns = await fetchDonationsMade(u.email);
                }

                total = txns.reduce((sum, p) => sum + p.amount, 0);
                setPayments(txns);
                setTotalAmount(total);
            } catch (err) {
                console.error(err);
                toast.error("Failed to load data");
            }
        };

        if (username) loadData();
    }, [username, session]);

    useEffect(() => {
        if (searchParams.get("paymentdone") === "true") {
            toast('Thanks for your donation!', { position: "top-right", autoClose: 5000, theme: "light", transition: Bounce });
            router.replace(`/${username}`);
        }
    }, []);

    const pay = async (amount) => {
        if (!currentUser?.razorpayid || !currentUser?.razorpaysecret) {
            return toast.error("Receiver has not set up Razorpay details correctly.");
        }

        try {
            const res = await initiate(amount, username, {
                ...paymentform,
                from_user: session?.user?.email || "guest",
            });

            if (!res?.id) return toast.error("Payment initiation failed.");

            new Razorpay({
                key: currentUser.razorpayid,
                amount,
                currency: "INR",
                name: "Get Me A Book",
                description: "Support a book request",
                image: "/book.webp",
                order_id: res.id,
                callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
                prefill: { name: paymentform.name || "Guest", email: "example@example.com", contact: "9000090000" },
                notes: { address: "GetMeABook Office" },
                theme: { color: "#3399cc" },
            }).open();
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong while initiating payment.");
        }
    };

    return (
        <>
            <ToastContainer />
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />

            <div className="top-3 cover w-full bg-red-50 relative">
                <img className="object-cover w-full h-[60vh]" src="https://previews.123rf.com/images/yourapechkin/yourapechkin2412/yourapechkin241215714/239379490-a-spacious-library-filled-with-books-showcases-a-glowing-globe-under-a-starry-sky-and-floating.jpg" alt="cover" />
                <div className="absolute -bottom-20 right-1/2 translate-x-1/2 border-black overflow-hidden border-2 rounded-full size-32">
                    <img className="rounded-full object-cover size-32" src={currentUser?.profilepic || "https://insidetime.org/wp-content/uploads/2021/10/Handing-in-books.jpg"} alt="profile" />
                </div>
            </div>

            <div className="info flex justify-center items-center mt-28 flex-col gap-2 px-4 text-center">
                <div className="font-bold text-lg flex items-center gap-2">
                    @{username} <span className="text-yellow-500 text-xl">⭐</span>
                </div>
                <div className="text-slate-500">
                    {currentUser?.type === "receiver" ? (
                        <>
                            {currentUser.description} | <span className="font-bold text-xl text-green-600">Total received: ₹{totalAmount / 100}</span>
                        </>
                    ) : (
                        <>
                            Helping with Donations | <span className="font-bold text-xl text-blue-600">Total donated: ₹{totalAmount / 100}</span>
                        </>
                    )}
                </div>
            </div>

            <div className="payment flex flex-col lg:flex-row gap-6 w-full px-4 mt-11 mb-20">
                <div className={`supporters ${currentUser?.type === "receiver" ? "lg:w-1/2 w-full" : "w-full"} bg-slate-300 rounded-lg text-black p-6 max-h-[75vh] overflow-y-auto`}>
                    <h2 className='text-2xl font-bold mb-4'>
                        {currentUser?.type === "receiver" ? "Supporters" : "Donations Made"}
                    </h2>
                    <ul className='text-lg'>
                        {payments.length === 0 ? <li>No Payments Yet</li> : payments.map((p, i) => (
                            <li key={i} className="my-2 flex gap-2 items-start">
                                <img className="rounded-full" width={30} src="/avatar.gif" alt="user avatar" />
                                <span>
                                    {currentUser?.type === "receiver"
                                        ? `${p.name} donated ₹${p.amount / 100} with message "${p.message}"`
                                        : `"${currentUser.name}" donated "₹${p.amount / 100}" to this gmail account "${p.to_user}" with message "${p.message}"`}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {currentUser?.type === "receiver" && (
                    <div className="makepayment lg:w-1/2 w-full bg-slate-300 rounded-lg text-black p-6">
                        <h2 className='text-2xl font-bold'>Make a payment</h2>
                        <div className="flex gap-3 flex-col my-5">
                            <input onChange={handleChange} value={paymentform.name} name='name' type="text" className='w-full p-3 rounded-lg bg-slate-500' placeholder='Enter Name' />
                            <input onChange={handleChange} value={paymentform.message} name='message' type="text" className='w-full p-3 rounded-lg bg-slate-500' placeholder='Enter Message' />
                            <input onChange={handleChange} value={paymentform.amount} name="amount" type="number" className='w-full p-3 rounded-lg bg-slate-500' placeholder='Enter Amount' />
                            <button onClick={() => pay(Number.parseInt(paymentform.amount) * 100)}
                                className="text-white bg-gradient-to-br from-purple-800 to-blue-800 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-lg px-5 py-2.5 text-center disabled:bg-slate-500 disabled:from-purple-300"
                                disabled={paymentform.name.length < 3 || paymentform.message.length < 4 || isNaN(Number(paymentform.amount))}>
                                Pay
                            </button>
                        </div>

                        <div className="flex gap-3 flex-wrap mt-4">
                            {[10, 20, 30].map(amt => (
                                <button key={amt} onClick={() => pay(amt * 100)} className="text-white bg-gradient-to-br from-purple-600 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-100 font-medium rounded-lg text-lg px-5 py-2.5 text-center">
                                    Pay ₹{amt}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default PaymentPage;
