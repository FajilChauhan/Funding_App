import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Get Me A Book",
  description: "Collect Funding For Buying A Book For Those Who Cannot Afford One",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white bg-[radial-gradient(rgba(120,119,198,0.3),rgba(255,255,255,0))] text-black min-h-screen flex flex-col`}>
        <SessionWrapper>
          <Navbar />
          <main className="flex-1 w-full">
            {children}
          </main>
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
