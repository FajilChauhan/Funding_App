"use client";

import { useEffect, useRef, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Navbar = () => {
  const { data: session, update } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchUser, setSearchUser] = useState("");
  const router = useRouter();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      update();
    }, 10000);
    return () => clearInterval(interval);
  }, [update]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchUser.trim()) {
      router.push(`/${searchUser.trim()}`);
      setSearchUser("");
    }
  };

  return (
    <nav className="bg-blue-300 text-black px-4 py-3 flex flex-col sm:flex-row justify-between items-center shadow-md">
      {/* Logo */}
      <Link href="/" className="flex items-center mb-2 sm:mb-0">
        <Image src="/book.webp" width={30} alt="Logo" />
        <span className="ml-2 font-bold text-lg">Getme-A-Book!</span>
      </Link>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex items-center gap-2 mb-2 sm:mb-0">
        <input
          type="text"
          placeholder="Search username..."
          value={searchUser}
          onChange={(e) => setSearchUser(e.target.value)}
          className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring focus:border-blue-500 w-48 sm:w-64"
        />
        <button
          type="submit"
          className="px-4 py-2 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 font-medium rounded text-sm"
        >
          Search
        </button>
      </form>

      {/* Right Section */}
      <div className="relative flex items-center" ref={dropdownRef}>
        {session ? (
          <>
            {/* Dropdown Button */}
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="ml-4 px-4 py-2 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded text-sm flex items-center"
            >
              Welcome {session.user.name}
              <svg className="w-3 h-3 ml-2" fill="none" viewBox="0 0 10 6">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1l4 4 4-4"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50">
                <ul className="py-2 text-sm text-gray-700">
                  <li>
                    <Link href="/" className="block px-4 py-2 hover:bg-gray-100">
                      Home Page
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link href="/feed" className="block px-4 py-2 hover:bg-gray-100">
                      Feed
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100">
                      Your Page
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => signOut()}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </>
        ) : (
          <Link href="/login">
            <button className="ml-4 px-4 py-2 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded text-sm">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
