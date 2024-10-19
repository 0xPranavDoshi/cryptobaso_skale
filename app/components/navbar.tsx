"use client";
import Link from "next/link";
import { SecondaryButton } from "../ui/button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 60) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className="z-20 w-screen h-[80px] flex fixed top-0 left-0 items-center justify-center"
      animate={{
        backgroundColor: isScrolled ? "#17191AFF" : "rgba(25, 27, 28, 0)",
      }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      <div className="w-[85%] flex items-center justify-between">
        <h2 className="text-white font-black text-2xl font-robotoMono">
          CryptoBASE
        </h2>
        <div className="flex gap-8 items-center">
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
    </motion.div>
  );
};

export default Navbar;
