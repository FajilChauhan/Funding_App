"use client";
import React from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from "next/image";

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push('/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-100 to-purple-100 px-4 py-10">
      
      {/* Logo & App Name */}
      <div className="flex items-center mb-6">
        <Image src="/book.webp" alt="logo" className="w-12 h-12" />
        <h1 className="ml-3 text-3xl font-extrabold">Get-Me-A-Book</h1>
      </div>

      {/* Tagline */}
      <h2 className="text-center text-xl md:text-2xl  font-semibold mb-10">
        Connect with Us!
      </h2>

      {/* Login Buttons */}
      <div className="w-full max-w-sm flex flex-col gap-4">
        {/* Google Login */}
        <button
          onClick={() => signIn("google")}
          className="flex items-center bg-white border border-gray-300 rounded-lg shadow px-6 py-3 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="-0.5 0 48 48">
            <g fill="none" fillRule="evenodd">
              <path fill="#FBBC05" d="M9.83,24c0-1.52.25-2.98.7-4.36L2.62,13.6C1.08,16.73.21,20.26.21,24s.87,7.26,2.41,10.39l7.9-6.05C10.08,26.97,9.83,25.52,9.83,24" />
              <path fill="#EB4335" d="M23.71,10.13c3.31,0,6.3,1.17,8.66,3.1l6.84-6.83C35.04,2.77,29.7.53,23.71.53c-9.29,0-17.27,5.31-21.09,13.07l7.91,6.04c1.82-5.53,7.02-9.51,13.18-9.51" />
              <path fill="#34A853" d="M23.71,37.87c-6.16,0-11.36-3.98-13.18-9.51l-7.91,6.04c3.82,7.76,11.8,13.08,21.09,13.08,5.73,0,11.19-2.03,15.31-5.85l-7.51-5.8c-2.12,1.34-4.79,2.06-7.8,2.06" />
              <path fill="#4285F4" d="M46.15,24c0-1.39-.21-2.88-.53-4.27H23.71v9.07H36.32c-.63,3.09-2.35,5.45-4.8,6.99l7.51,5.8c4.31-4,7.13-9.97,7.13-17.59" />
            </g>
          </svg>
          Continue with Google
        </button>

        {/* GitHub Login */}
        <button
          onClick={() => signIn("github")}
          className="flex items-center bg-white border border-gray-300 rounded-lg shadow px-6 py-3 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 73 73">
            <rect x="1" y="1" width="70" height="70" rx="14" fill="#000" />
            <path fill="#fff" d="M36.5 14C24.4 14 14.5 24.2 14.5 36.4c0 9.9 6.3 18.3 15.1 21.2 1.1.2 1.5-.5 1.5-1.1v-3.8c-6.2 1.3-7.6-2.6-7.6-2.6-1-2.5-2.4-3.1-2.4-3.1-2-1.3.1-1.3.1-1.3 2.2.1 3.3 2.3 3.3 2.3 2 3.3 5.2 2.3 6.5 1.8.2-1.5.8-2.3 1.4-2.9-4.9-.6-10-2.5-10-11.1 0-2.4.9-4.4 2.3-5.9-.2-.6-1-3 .2-6.2 0 0 1.9-.6 6.3 2.3 1.8-.5 3.7-.8 5.6-.8s3.8.3 5.6.8c4.4-2.9 6.3-2.3 6.3-2.3 1.2 3.2.4 5.6.2 6.2 1.4 1.5 2.3 3.5 2.3 5.9 0 8.6-5.1 10.5-10 11.1.9.8 1.5 2.1 1.5 4.2v6.2c0 .6.4 1.3 1.5 1.1 8.8-2.9 15.1-11.3 15.1-21.2 0-12.2-9.9-22.4-22-22.4z" />
          </svg>
          Continue with GitHub
        </button>
      </div>
    </div>
  );
};

export default Login;
