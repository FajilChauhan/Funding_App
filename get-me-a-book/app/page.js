import Image from "next/image";

export default function Home() {
  return (
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
  );
}
