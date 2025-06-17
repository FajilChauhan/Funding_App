"use client"
import React, { useState, useEffect} from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { fetchuser, updateProfile } from '@/actions/useractions'
//import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
//import { Bounce } from 'react-toastify';

const Dashboard = () => {
    const { data: session, update } = useSession()
    const router = useRouter()
    const [form, setform] = useState({})

    useEffect(() => {
        getData()
        if (!session) {
            router.push('/login')
        }
    }, [router, session])

    const getData = async () => {
        let u = await fetchuser(session.user.name)
        setform(u)
    }
   
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        let a = await updateProfile(e, session.user.name)
        alert("Profil Updated")
    }

    return (
        <>
            <div className='container mx-auto py-5 px-6 '>
                <h1 className='text-center my-5 text-3xl font-bold'>Welcome to your Dashboard</h1>

                <form className="max-w-2xl mx-auto" action={handleSubmit}>

                    <div className='my-2'>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium  text-black">Name</label>
                        <input value={form.name ? form.name : ""} onChange={handleChange} type="text" name='name' id="name" className="block w-full p-2 rounded-lg bg-slate-300" />
                    </div>
                    {/* input for email */}
                    <div className="my-2">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-black">Email</label>
                        <input value={form.email ? form.email : ""} onChange={handleChange} type="email" name='email' id="email" className="block w-full p-2 rounded-lg bg-slate-300" />
                    </div>
                    {/* input forusername */}
                    <div className='my-2'>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-black">Username</label>
                        <input value={form.username ? form.username : ""} onChange={handleChange} type="text" name='username' id="username" className="block w-full p-2 rounded-lg bg-slate-300" />
                    </div>
                    {/* input for profilepic picture of input type text */}
                    <div className="my-2">
                        <label htmlFor="profilepic" className="block mb-2 text-sm font-medium text-black">profilepic Picture</label>
                        <input value={form.profilepic ? form.profilepic : ""} onChange={handleChange} type="text" name='profilepic' id="profilepic" className="block w-full p-2 rounded-lg bg-slate-300" />
                    </div>

                    {/* input for coverpicpic pic  */}
                    <div className="my-2">
                        <label htmlFor="coverpic" className="block mb-2 text-sm font-medium text-black">coverpicpic Picture</label>
                        <input value={form.coverpic ? form.coverpic : ""} onChange={handleChange} type="text" name='coverpic' id="coverpic" className="block w-full p-2 rounded-lg bg-slate-300" />
                    </div>
                    {/* input razorpay id */}
                    <div className="my-2">
                        <label htmlFor="razorpayid" className="block mb-2 text-sm font-medium text-black">Razorpay Id</label>
                        <input value={form.razorpayid ? form.razorpayid : ""} onChange={handleChange} type="text" name='razorpayid' id="razorpayid" className="block w-full p-2 rounded-lg bg-slate-300" />
                    </div>
                    {/* input razorpay secret */}
                    <div className="my-2">
                        <label htmlFor="razorpaysecret" className="block mb-2 text-sm font-medium text-black">Razorpay Secret</label>
                        <input value={form.razorpaysecret ? form.razorpaysecret : ""} onChange={handleChange} type="text" name='razorpaysecret' id="razorpaysecret" className="block w-full p-2 rounded-lg bg-slate-300" />
                    </div>

                    {/* Submit Button  */}
                    <div className="my-6">
                        <button type="submit" className="block w-full p-2 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Save</button>
                    </div>
                </form>


            </div>
        </>
    )
}

export default Dashboard