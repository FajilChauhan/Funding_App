"use client"
import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react';
import {useRouter} from 'next/navigation';

const Login = () => {
    const {data: session} = useSession()

    if(session){
        const router = useRouter()
        router.push('/dashboard')
    }
    return (
        <div classNameName='text-black container mx-auto'>
            <h1 className='text-center font-bold text-3xl py-10'>Login to Get your fans to support you</h1>
            <div className="social-login-buttons">
                <div class="flex flex-col items-center justify-center my-0">
                    <div class="flex flex-col gap-4">

                        <button class="flex items-center w-full bg-white border border-gray-300 rounded-lg shadow-md px-6 py-3 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        onClick={()=>signIn("github")}>
                            <svg class="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="-0.5 0 48 48">
                                <g fill="none" fill-rule="evenodd">
                                    <path fill="#FBBC05" d="M9.83,24c0-1.52.25-2.98.7-4.36L2.62,13.6C1.08,16.73.21,20.26.21,24s.87,7.26,2.41,10.39l7.9-6.05C10.08,26.97,9.83,25.52,9.83,24" />
                                    <path fill="#EB4335" d="M23.71,10.13c3.31,0,6.3,1.17,8.66,3.1l6.84-6.83C35.04,2.77,29.7.53,23.71.53c-9.29,0-17.27,5.31-21.09,13.07l7.91,6.04c1.82-5.53,7.02-9.51,13.18-9.51" />
                                    <path fill="#34A853" d="M23.71,37.87c-6.16,0-11.36-3.98-13.18-9.51l-7.91,6.04c3.82,7.76,11.8,13.08,21.09,13.08,5.73,0,11.19-2.03,15.31-5.85l-7.51-5.8c-2.12,1.34-4.79,2.06-7.8,2.06" />
                                    <path fill="#4285F4" d="M46.15,24c0-1.39-.21-2.88-.53-4.27H23.71v9.07H36.32c-.63,3.09-2.35,5.45-4.8,6.99l7.51,5.8c4.31-4,7.13-9.97,7.13-17.59" />
                                </g>
                            </svg>
                            <span>Continue with Google</span>
                        </button>

                        <button class="flex items-center w-full bg-white border border-gray-300 rounded-lg shadow-md px-6 py-3 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                            <svg class="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="-0.5 0 48 48">
                                <path fill="#00AAEC" d="M48,5.74c-1.76,0.8-3.66,1.34-5.66,1.6A9.93,9.93,0,0,0,46.14,3c-1.84,1.1-3.88,1.9-6.06,2.32A9.92,9.92,0,0,0,33.23,2c-5.48,0-9.93,4.44-9.93,9.93,0,.78.09,1.54.26,2.27C15.42,13.92,8.18,10.09,3.34,4.09A9.9,9.9,0,0,0,2,8.38c0,3.43,1.74,6.46,4.38,8.24-1.61-.05-3.12-.49-4.44-1.22v.12c0,4.8,3.41,8.8,7.92,9.7-0.83.23-1.72.35-2.63.35a9.93,9.93,0,0,1-1.86-.18c1.27,3.96,4.96,6.84,9.33,6.93a19.9,19.9,0,0,1-12.3,4.24c-.8,0-1.59-.05-2.37-.14A28.05,28.05,0,0,0,16.18,42c18.76,0,29.03-15.55,29.03-29.03,0-.44-.01-.88-.03-1.31A20.61,20.61,0,0,0,48,5.74z" />
                            </svg>
                            <span>Continue with Twitter</span>
                        </button>

                        <button class="flex items-center w-full bg-white border border-gray-300 rounded-lg shadow-md px-6 py-3 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                            <svg class="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="-0.5 0 48 48">
                                <path fill="#4460A0" d="M24 0C10.77 0 0 10.77 0 24s10.77 24 24 24 24-10.77 24-24S37.23 0 24 0zm4.75 24h-3.54v12H21.5V24h-2v-3.5h2v-2.31C21.5 15.47 23.25 14 26.16 14c1.18 0 2.2.09 2.5.13v2.89h-1.71c-1.35 0-1.61.64-1.61 1.58v2.1h3.26L28.75 24z" />
                            </svg>
                            <span>Continue with Facebook</span>
                        </button>

                        <button class="flex items-center w-full bg-white border border-gray-300 rounded-lg shadow-md px-6 py-3 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        onClick={()=>signIn("github")}>
                            <svg class="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 73 73">
                                <rect x="1" y="1" width="70" height="70" rx="14" fill="#000" />
                                <path fill="#fff" d="M36.5 14C24.4 14 14.5 24.2 14.5 36.4c0 9.9 6.3 18.3 15.1 21.2 1.1.2 1.5-.5 1.5-1.1v-3.8c-6.2 1.3-7.6-2.6-7.6-2.6-1-2.5-2.4-3.1-2.4-3.1-2-1.3.1-1.3.1-1.3 2.2.1 3.3 2.3 3.3 2.3 2 3.3 5.2 2.3 6.5 1.8.2-1.5.8-2.3 1.4-2.9-4.9-.6-10-2.5-10-11.1 0-2.4.9-4.4 2.3-5.9-.2-.6-1-3 .2-6.2 0 0 1.9-.6 6.3 2.3 1.8-.5 3.7-.8 5.6-.8s3.8.3 5.6.8c4.4-2.9 6.3-2.3 6.3-2.3 1.2 3.2.4 5.6.2 6.2 1.4 1.5 2.3 3.5 2.3 5.9 0 8.6-5.1 10.5-10 11.1.9.8 1.5 2.1 1.5 4.2v6.2c0 .6.4 1.3 1.5 1.1 8.8-2.9 15.1-11.3 15.1-21.2 0-12.2-9.9-22.4-22-22.4z" />
                            </svg>
                            <span>Continue with Github</span>
                        </button>
                    </div>
                    </div>
                </div>
            </div>
            )
}

            export default Login
