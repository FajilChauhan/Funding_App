import React from 'react'

const Username = ({params}) => {
  return (
    <>
     <div className="top-3 cover w-full bg-red-50 relative">
      <img className='object-fit w-full h-[400px]' src="background.png" alt="" />
      <div className='absolute -bottom-20 right-[45%] border-white border-2 rounded-full'>
        <img className="rounded-full" width={125} height={125} src="https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg?w=1200" alt="" />
      </div>
     </div>
     <div className="info flex justify-center items-center my-24 flex-col gap-2">
      <div className="font-bold text-lg">
        @{params.username}
      </div>
      <div className="text-slate-500">
        Creating Animated art for VTT's
      </div>
      <div className="text-slate-500">
        9,719 members . 82 posts . $15,450/release
      </div>
      <div className="payment flex gap-3 w-[95%] mt-11">
        <div className="supporters w-1/2 bg-slate-300 rounded-lg text-black p-8">
        <h2 className='text-2xl font-bold'>Supporters</h2>
          <ul className='mx-5 text-lg'>
            <li className="my-2 flex gap-2 items-center">
              <img className="rounded-full" width={30} src="avatar.gif" alt="user avatar" />
              <span>
                 Shubham donated <span className='font-bold'>$30</span> with a message "I support U Bro.."
              </span>
            </li>
            <li className="my-2 flex gap-2 items-center">
              <img className="rounded-full" width={30} src="avatar.gif" alt="user avatar" />
              <span>
                 Shubham donated <span className='font-bold'>$30</span> with a message "I support U Bro.."
              </span>
            </li>
            <li className="my-2 flex gap-2 items-center">
              <img className="rounded-full" width={30} src="avatar.gif" alt="user avatar" />
              <span>
                 Shubham donated <span className='font-bold'>$30</span> with a message "I support U Bro.."
              </span>
            </li>
            <li className="my-2 flex gap-2 items-center">
              <img className="rounded-full" width={30} src="avatar.gif" alt="user avatar" />
              <span>
                 Shubham donated <span className='font-bold'>$30</span> with a message "I support U Bro.."
              </span>
            </li>
            <li className="my-2 flex gap-2 items-center">
              <img className="rounded-full" width={30} src="avatar.gif" alt="user avatar" />
              <span>
                 Shubham donated <span className='font-bold'>$30</span> with a message "I support U Bro.."
              </span>
            </li>
          </ul>
        </div>

        <div className="makepayment w-1/2 bg-slate-300 rounded-lg text-black p-8">
          <h2 className='text-2xl font-bold'>Make a payment</h2>
          <div className="flex gap-2 flex-col my-5">
            <input type="text" className='w-full p-3 rounded-lg bg-slate-500' placeholder='Enter Name' />
            <input type="text" className='w-full p-3 rounded-lg bg-slate-500' placeholder='Enter Message' />
            <input type="text" className='w-full p-3 rounded-lg bg-slate-500' placeholder='Enter Amount' />
            <button className="text-white bg-gradient-to-br from-purple-800 to-blue-800 
            hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300
             dark:focus:ring-blue-800 font-bold rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2">Pay</button>
          </div>
          <div className="flex gap-3 mt-5">
            <button className="text-white bg-gradient-to-br from-purple-600 to-blue-600 
            hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-100
             dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2">Pay 10</button>
            <button className="text-white bg-gradient-to-br from-purple-600 to-blue-600 
            hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300
             dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2">Pay 20</button>
            <button className="text-white bg-gradient-to-br from-purple-600 to-blue-600 
            hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300
             dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2">Pay 30</button>
          </div>
        </div>
      </div>
     </div>
    </>
  )
}

export default Username
