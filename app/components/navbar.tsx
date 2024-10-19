"use client";
import Link from "next/link";
import { SecondaryButton } from "../ui/button";

const Navbar = () => {
  return (
    <div className="z-20 w-screen bg-background h-[80px] flex fixed top-0 left-0 items-center justify-center">
      <div className="w-[85%] flex items-center justify-between">
        <div className="flex gap-8 items-center">
          <div className="w-12 h-12 rounded-full bg-white"></div>
          <Link className="text-light font-robotoMono no-underline" href="/">
            Buy & Sell
          </Link>
          <Link className="text-light font-robotoMono no-underline" href="/">
            Markets
          </Link>
          <Link className="text-light font-robotoMono no-underline" href="/">
            About Us
          </Link>
        </div>
        <SecondaryButton text="Connect Wallet" onClick={() => {}} />
      </div>
    </div>
  );
};

export default Navbar;
