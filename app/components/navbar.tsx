"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SecondaryButton } from "../ui/button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

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
        backgroundColor:
          pathname === "/"
            ? isScrolled
              ? "#17191AFF"
              : "rgba(25, 27, 28, 0)"
            : "#17191AFF",
      }}
      transition={{ duration: pathname === "/" ? 0.2 : 0, ease: "easeInOut" }}
    >
      <div className="w-[85%] flex items-center justify-between">
        <Link
          href="/"
          className="text-white font-black text-2xl font-robotoMono"
        >
          CryptoBASE
        </Link>
        <div className="flex gap-8 items-center">
          <Link
            className="text-light hover:text-white transition-colors font-robotoMono no-underline"
            href="/market"
          >
            Markets
          </Link>
          <Link
            className="text-light hover:text-white transition-colors font-robotoMono no-underline"
            href="/portfolio"
          >
            Portfolio
          </Link>
          <Link
            className="text-light hover:text-white transition-colors font-robotoMono no-underline"
            href="/about"
          >
            About Us
          </Link>
        </div>
        <SecondaryButton text="Connect Wallet" onClick={() => {}} />
      </div>
    </motion.div>
  );
};

export default Navbar;
