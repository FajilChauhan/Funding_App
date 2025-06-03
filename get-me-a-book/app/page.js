import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="flex justify-center flex-col gap-4 items-center text-black h-[44vh]">
        <div className="font-bold text-5xl">
          Buy Me a Book
        </div>
        <p>
          A crowdfunding platform for Who is not able to buy a book. Let's
          Part For A Helping A child For Study. Start now!
        </p>
        <div>
          <button type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            Start Here
          </button>
          <button type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            Read More
          </button>
        </div>
      </div>
      <div className="bg-black h-1 opacity-10">
      </div>
      <div className="text-black container mx-auto">
        <h1 className="text-2xl font-bold text-center my-4">Your Fans can buy you a Book</h1>
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

      <div className="bg-black h-1 opacity-10 my-4">
      </div>
      <div className="text-black container mx-auto">
        <h1 className="text-2xl font-bold text-center my-4">Your Fans can buy you a Book</h1>
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
    </>
  );
}
