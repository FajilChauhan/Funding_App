"use client";
import React, { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

const Navbar = () => {
  const { data: session } = useSession();
  const [showdropdown, setShowdropdown] = useState(false);

  return (
    <nav className='bg-blue-300 text-black flex justify-between items-center px-4 h-16'>
      {/* Logo */}
      <div>
        <Link className="logo font-bold text-lg flex justify-center items-center" href="/">
          <img src="book.webp" width={30} alt="Logo" />
          <span className="ml-2">Getme-A-Book!</span>
        </Link>
      </div>

      {/* Right section */}
      <div className='relative'>
        {session && (
          <>
            {/* Dropdown Button */}
            <button
              onClick={() => setShowdropdown(!showdropdown)}
              id="dropdownDefaultButton"
              className="text-white mx-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
              type="button"
            >
              Welcome {session.user.name}
              <svg className="w-2.5 h-2.5 ms-3 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            <div
              onMouseLeave={() => setShowdropdown(false)}
              className={`z-10 ${showdropdown ? "" : "hidden"} absolute left-[15px] top-12 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
            >
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                <li>
                  <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Your Page
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => signOut()}
                    className="w-full text-left block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}

        {/* Logout Button (optional extra button) */}
        {session && (
          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={() => signOut()}
          >
            Logout
          </button>
        )}

        {/* Login Button */}
        {!session && (
          <Link href="/login">
            <button
              type="button"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
