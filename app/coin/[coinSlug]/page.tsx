"use client";

import CoinChart from "@/app/components/market/chart";
import Navbar from "@/app/components/navbar";
import { IoIosArrowBack } from "react-icons/io";
import Image from "next/image";
import TradeCard from "@/app/components/market/trade_card";
import { useRouter } from "next/navigation";

const CoinPage = ({ params }: { params: { coinSlug: string } }) => {
  const router = useRouter();
  return (
    <div className="w-screen bg-background">
      <div className="w-[400px] h-[400px] blur-[720px] rounded-full fixed top-32 left-32 select-none bg-bubble"></div>
      <div className="w-[300px] h-[300px] blur-[720px] rounded-full fixed bottom-8 right-8 select-none bg-bubble"></div>

      <Navbar />

      <div className="w-full h-[calc(100vh-80px)] mt-[80px] flex justify-center">
        <div className="w-3/4 flex-col pt-8">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => router.back()}
          >
            <IoIosArrowBack className="text-2xl" />
            <h1 className="text-lg font-semibold font-robotoMono">Back</h1>
          </div>

          <div className="flex gap-4 my-8">
            <Image
              src="/coins/ethereum.png"
              alt="eth"
              width={32}
              height={32}
              className="rounded-full"
            />
            <h1 className="text-2xl font-semibold font-robotoMono">Ethereum</h1>
          </div>

          <div className="flex gap-4">
            <CoinChart />
            <TradeCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinPage;
