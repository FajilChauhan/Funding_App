import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className='bg-blue-300 text-black 
        flex justify-between items-center px-4 h-16'>
      <div className="logo font-bold text-lg flex justify-center items-center">
        <img src="book.webp" width={30} alt="" />
        <span>Getme-A-Book!</span>
      </div>
      <div>
        <Link href={"/login"}>
        <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            Login
        </button></Link>
      </div>
    </nav>
  )
}

export default Navbar
