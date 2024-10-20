"use client";

import Image from "next/image";
import { PrimaryButton } from "../../ui/button";
import { useRouter } from "next/navigation";

const MainContent = () => {
  const router = useRouter();
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-3/4 flex items-center justify-between">
        <div className="flex flex-col items-start justify-center gap-8">
          <h1 className="z-10 text-5xl font-light font-robotoMono text-white">
            Buy & Sell Crypto <p className="pt-2">on Your Terms!</p>
          </h1>
          <PrimaryButton
            text="Explore Market"
            onClick={() => router.push("/market")}
          />
        </div>

        <div className="flex items-center justify-center">
          <Image
            src="/illustration.png"
            alt="Crypto illustration"
            width={550}
            height={550}
          />
        </div>
      </div>
    </div>
  );
};

export default MainContent;
