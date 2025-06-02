import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-blue-300 text-black 
        flex justify-between items-center px-4 h-10'>
      <div className="logo font-bold text-lg">
        Getme-A-Book!
      </div>
      <ul className='flex justify-between gap-4'>
        <li>Home</li>
        <li>About</li>
        <li>Project</li>
        <li>Sign Up</li>
        <li>Login</li>
      </ul>
    </nav>
  )
}

export default Navbar
