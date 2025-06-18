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
    const [currentUser, setCurrentUser] = useState({});
    const [payments, setPayments] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const searchParams = useSearchParams();
    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {
        // Always try to get user data by username from URL
        getData();

        // If the viewer is not logged in, don't do anything else
        if (status === "unauthenticated") return;

        // You can still do logged-in specific stuff here if needed
    }, [status, session]);

    useEffect(() => {
        if (searchParams.get("paymentdone") === "true") {
            toast('Thanks for your donation!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            router.replace(`/${username}`);
        }
    }, []);

    const handleChange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value });
    };

    const getData = async () => {
        const u = await fetchuser(username); // always fetch profile user
        setCurrentUser(u);

        const currentViewerUsername = session?.user?.name;
        let total = 0;

        if (u?.type === "receiver") {
            const dbpayments = await fetchpayments(username);
            setPayments(dbpayments);
            total = dbpayments.reduce((acc, p) => acc + p.amount, 0);
        } else if (currentViewerUsername) {
            const donated = await fetchDonationsMade(currentViewerUsername);
            setPayments(donated);
            total = donated.reduce((acc, p) => acc + p.amount, 0);
        }

        setTotalAmount(total);
    };


    const pay = async (amount) => {
        let a = await initiate(amount, username, {
            ...paymentform,
            from_user: session?.user?.name || "guest"
        });
        let orderId = a.id;

        const options = {
            key: currentUser.razorpayid,
            amount: amount,
            currency: "INR",
            name: "Get Me A Book",
            description: "Support a book request",
            image: "/logo.png",
            order_id: orderId,
            callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            prefill: {
                name: paymentform.name || "Guest",
                email: "example@example.com",
                contact: "9000090000"
            },
            notes: { address: "GetMeABook Office" },
            theme: { color: "#3399cc" }
        };

        const rzp1 = new Razorpay(options);
        rzp1.open();
    };

    return (
        <>
            <ToastContainer />
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            <div className="top-3 cover w-full bg-red-50 relative">
                <img
                    className="object-cover w-full h-[60vh]"
                    src={currentUser?.coverpic || "https://previews.123rf.com/images/yourapechkin/yourapechkin2412/yourapechkin241215714/239379490-a-spacious-library-filled-with-books-showcases-a-glowing-globe-under-a-starry-sky-and-floating.jpg"}
                    alt="cover"
                />

                <div className="absolute -bottom-20 right-[45%] border-black overflow-hidden border-2 rounded-full size-32">
                    <img
                        className="rounded-full object-cover size-32"
                        src={currentUser?.profilepic || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4fU1kb6Rdw6c_XB9KVvgZLSn7PzFFT2QeXQ&s"}
                        alt="profile"
                    />
                </div>

            </div>

            <div className="info flex justify-center items-center my-24 flex-col gap-2">
                <div className="font-bold text-lg flex items-center gap-2">
                    @{username} <span className="text-yellow-500 text-xl">⭐</span>
                </div>
                <div className="text-slate-500 text-center">
                    {currentUser?.type === "receiver" ? (
                        <>
                            {currentUser.description}
                            {" | "}
                            <span className="font-bold text-xl">
                                Total received: ₹{totalAmount / 100}
                            </span>
                        </>
                    ) : (
                        <>
                            Helping with Donations |{" "}
                            <span className="font-bold text-xl">
                                Total donated: ₹{totalAmount / 100}
                            </span>
                        </>
                    )}
                </div>

                <div className="payment flex gap-3 w-[95%] mt-11">
                    <div className={`supporters ${currentUser?.type === "receiver" ? "w-1/2" : "w-full"} bg-slate-300 rounded-lg text-black p-8 h-[75vh] overflow-y-auto`}>
                        <h2 className='text-2xl font-bold mb-4'>
                            {currentUser?.type === "receiver" ? "Supporters" : "Donations Made"}
                        </h2>
                        <ul className='mx-5 text-lg'>
                            {payments.length === 0 && <li>No Payments Yet</li>}
                            {payments.map((p, i) => (
                                <li key={i} className="my-2 flex gap-2 items-start">
                                    <img className="rounded-full" width={30} src="/avatar.gif" alt="user avatar" />
                                    <span>
                                        {currentUser?.type === "receiver"
                                            ? `${p.name} donated ₹${p.amount / 100} with message "${p.message}"`
                                            : `You donated ₹${p.amount / 100} to @${p.to_user} with message "${p.message}"`}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {currentUser?.type === "receiver" && (
                        <div className="makepayment w-1/2 bg-slate-300 rounded-lg text-black p-8">
                            <h2 className='text-2xl font-bold'>Make a payment</h2>
                            <div className="flex gap-2 flex-col my-5">
                                <input onChange={handleChange} value={paymentform.name} name='name' type="text" className='w-full p-3 rounded-lg bg-slate-500' placeholder='Enter Name' />
                                <input onChange={handleChange} value={paymentform.message} name='message' type="text" className='w-full p-3 rounded-lg bg-slate-500' placeholder='Enter Message' />
                                <input onChange={handleChange} value={paymentform.amount} name="amount" type="text" className='w-full p-3 rounded-lg bg-slate-500' placeholder='Enter Amount' />
                                <button onClick={() => pay(Number.parseInt(paymentform.amount) * 100)} className="text-white bg-gradient-to-br from-purple-800 to-blue-800 
                                    hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300
                                    dark:focus:ring-blue-800 font-bold rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2 disabled:bg-slate-500 disabled:from-purple-300"
                                    disabled={paymentform.name?.length < 3 || paymentform.message?.length < 4}>
                                    Pay
                                </button>
                            </div>
                            <div className="flex gap-3 mt-5">
                                {[10, 20, 30].map(amt => (
                                    <button key={amt} onClick={() => pay(amt * 100)} className="text-white bg-gradient-to-br from-purple-600 to-blue-600 
                                        hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-100
                                        dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2">
                                        Pay ₹{amt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default PaymentPage;
