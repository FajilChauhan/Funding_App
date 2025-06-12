import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Get Me A Book",
  description: "Collect Funding For Buy A Book For Who is not Able to Buy A book",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white bg-[radial-gradient(rgba(120,119,198,0.3),rgba(255,255,255,0))] text-black">
        <SessionWrapper>
          <Navbar />
          <div className="min-h-screen bg-white bg-[radial-gradient(rgba(120,119,198,0.3),rgba(255,255,255,0))] text-black">
            {children}
          </div>
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
