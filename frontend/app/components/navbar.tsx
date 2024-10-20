"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SecondaryButton } from "../ui/button";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";
import { BrowserProvider, parseUnits } from "ethers";

interface AccountType {
  address?: string;
  balance?: string;
  chainId?: string;
  network?: string;
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const [accountData, setAccountData] = useState<AccountType | null>(null);

  useEffect(() => {
    const isConnected = async () => {
      const ethereum = window.ethereum;
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        console.log(`You're connected to: ${accounts[0]}`);
        const address = accounts[0];
        const provider = new ethers.BrowserProvider(ethereum);
        const balance = await provider.getBalance(address);
        const network = await provider.getNetwork();

        setAccountData({
          address,
          balance: ethers.formatEther(balance),
          // The chainId property is a bigint, change to a string
          chainId: network.chainId.toString(),
          network: network.name,
        });
      } else {
        console.log("Metamask is not connected");
      }
    };

    isConnected();
  }, []);

  const _connectToMetaMask = useCallback(async () => {
    const ethereum = window.ethereum;
    // Check if MetaMask is installed
    if (typeof ethereum !== "undefined") {
      try {
        // Request access to the user's MetaMask accounts
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });

        const address = accounts[0];
        const provider = new ethers.BrowserProvider(ethereum);
        const balance = await provider.getBalance(address);
        const network = await provider.getNetwork();

        setAccountData({
          address,
          balance: ethers.formatEther(balance),
          chainId: network.chainId.toString(),
          network: network.name,
        });
      } catch (error: Error | any) {
        alert(`Error connecting to MetaMask: ${error?.message ?? error}`);
      }
    } else {
      alert("MetaMask not installed");
    }
  }, []);

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
          CryptoBASO
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
        {!accountData ? (
          <SecondaryButton
            text="Connect Wallet"
            onClick={() => _connectToMetaMask()}
          />
        ) : (
          <div className="flex items-center gap-2">
            <p className="text-primary">
              Wallet Connected: {accountData?.address?.substring(0, 5)}...!
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Navbar;
