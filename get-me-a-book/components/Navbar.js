"use client";
import React, { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const { data: session } = useSession();
  const [showdropdown, setShowdropdown] = useState(false);
  const [searchUser, setSearchUser] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchUser.trim()) {
      router.push(`/${searchUser.trim()}`);
      setSearchUser('');
    }
  };

  return (
    <nav className='bg-blue-300 text-black flex justify-between items-center px-4 h-16'>
      {/* Logo */}
      <div>
        <Link className="logo font-bold text-lg flex justify-center items-center" href="/">
          <img src="/book.webp" width={30} alt="Logo" />
          <span className="ml-2">Getme-A-Book!</span>
        </Link>
      </div>

      {/* Search bar */}
      <form onSubmit={handleSearch} className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search username..."
          value={searchUser}
          onChange={(e) => setSearchUser(e.target.value)}
          className="px-6 py-2 rounded border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
        />
        <button
          type="submit"
          className= "px-5 py-2.5 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm"
        >
          Search
        </button>
      </form>

      {/* Right section */}
      <div className='relative flex items-center'>
        {session && (
          <>
            {/* Dropdown Button */}
            <button
              onClick={() => setShowdropdown(!showdropdown)}
              className="text-white mx-4 px-5 py-2.5 text-center inline-flex items-center bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm"
            >
              Welcome {session.user.name}
              <svg className="w-2.5 h-2.5 ml-2" aria-hidden="true" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            <div
              onMouseLeave={() => setShowdropdown(false)}
              className={`z-10 ${showdropdown ? "" : "hidden"} absolute left-[15px] top-12 bg-white divide-y divide-gray-100 rounded-lg shadow w-44`}
            >
              <ul className="py-2 text-sm text-gray-700">
                <li>
                  <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100">Dashboard</Link>
                </li>
                <li>
                  <Link href="/feed" className="block px-4 py-2 hover:bg-gray-100">Feed</Link>
                </li>
                <li>
                  <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100">Your Page</Link>
                </li>
                <li>
                  <button
                    onClick={() => signOut()}
                    className="w-full text-left block px-4 py-2 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}

        {/* Login Button */}
        {!session && (
          <Link href="/login">
            <button className="ml-4 px-5 py-2.5 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
