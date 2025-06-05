import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="flex justify-center flex-col gap-4 items-center text-black h-[44vh]">
        <div className="font-bold text-5xl flex justify-center items-center">
          <span className="mx-4">Buy Me a Book</span>
          <img src="book.webp" width={55} alt="" />
        </div>
        <p>
          A crowdfunding platform for Who is not able to buy a book. Let's
          Part For A Helping A child For Study. Start now!
        </p>
        <div>
          <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            Start Here
          </button>
          <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            Read More
          </button>
        </div>
      </div>
      <div className="bg-black h-1 opacity-10">
      </div>
      <div className="text-black container mx-auto my-4">
        <h1 className="text-3xl font-bold text-center my-4">Your Fans can buy you a Book</h1>
        <div className="flex gap-5 justify-around">
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className="bg-slate-300 rounded-full p-2" width={100} src="\main.jpeg" alt="" />
            <p className="font-bold">Fans Want to help</p>
            <p className="text-center">Your fans are available for you to help you</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className="bg-slate-300 rounded-full p-2" width={100} src="\main.jpeg" alt="" />
            <p className="font-bold">Fans Want to help</p>
            <p className="text-center">Your fans are available for you to help you</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className="bg-slate-300 rounded-full p-2" width={100} src="\main.jpeg" alt="" />
            <p className="font-bold">Fans Want to help</p>
            <p className="text-center">Your fans are available for you to help you</p>
          </div>
        </div>
      </div>

      <div className="bg-black h-1 opacity-10">
      </div>
      <div className="text-black container mx-auto flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-center my-4">Learn More About Us</h1>
        <div className="flex gap-5 justify-around">
          <div className="space-y-3 flex flex-col justify-center items-center mx-14 border-2 border-black bg-green-200">
            <p className="font-bold text-lg">Contact Us</p>
            <p className="text-center flex">MYSY Help-Line No: <h1 className="text-blue-900">7043333181</h1></p>
            <p className="text-center flex">Kcg Emailid :- <h1 className="text-blue-900">mysy-kcg@gujgov.edu.in</h1></p>
            <p className="text-center">Follow us on Instagram for regular updates.</p>
            <p className="text-center flex">Instagram id- <h1 className="text-blue-900">mysykcg</h1></p>
          </div>
            <iframe width="400" height="300" src="https://www.youtube.com/embed/kxGZekqJA30?si=9t-7biMSq5uj0VeM" 
        title="YouTube video player" frameborder="0" allow="accelerometer; 
        autoplay; clipboard-write; encrypted-media; gyroscope; 
        picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" 
        allowfullscreen></iframe>
        </div>
      </div>
    </>
  );
}
