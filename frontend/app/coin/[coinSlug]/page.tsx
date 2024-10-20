"use client";

import CoinChart from "@/app/components/market/chart";
import Navbar from "@/app/components/navbar";
import Image from "next/image";
import TradeCard from "@/app/components/market/trade_card";
import { CoinType } from "@/app/models/coin";
import { BackButton } from "@/app/ui/back_button";
import { useEffect, useState } from "react";

const CoinPage = ({ params }: { params: { coinSlug: string } }) => {
  const [coin, setCoin] = useState<CoinType>({
    symbol: "",
    slug: "",
    name: "",
    price: 0,
    change: "",
    percentageChange: "",
  } as CoinType);

  const fetchCoin = async () => {
    const symbol: string = (() => {
      switch (params.coinSlug) {
        case "tether":
          return "USDT";
        case "ethereum":
          return "ETH";
        case "skale":
          return "SKL";
        case "polygon":
          return "MATIC";
        default:
          return "";
      }
    })();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/exchangerate/${symbol}/USD`,
      {
        headers: {
          "X-CoinAPI-Key": process.env.NEXT_PUBLIC_API_KEY || "",
          "Content-Type": "application/json",
        },
      }
    );

    const data_price = await response.json();

    const coin = {
      symbol: symbol,
      slug: params.coinSlug,
      name:
        symbol === "USDT"
          ? "Tether"
          : symbol === "ETH"
          ? "Ethereum"
          : symbol === "MATIC"
          ? "Polygon"
          : "Skale",
      price: data_price.rate,
      change: "",
      percentageChange: "",
    } as CoinType;

    setCoin(coin);
  };

  useEffect(() => {
    fetchCoin();
  }, []);

  return (
    <div className="w-screen bg-background">
      <div className="w-[400px] h-[400px] blur-[720px] rounded-full fixed top-32 left-32 select-none bg-bubble"></div>
      <div className="w-[300px] h-[300px] blur-[720px] rounded-full fixed bottom-32 right-16 select-none bg-bubble"></div>

      <Navbar />

      <div className="w-full h-[calc(100vh-80px)] mt-[80px] flex justify-center">
        <div className="w-3/4 flex-col pt-8">
          <BackButton />

          <div className="flex gap-4 justify-between items-center my-8">
            <div className="flex gap-4 items-center">
              <Image
                src={`/coins/${coin?.slug}.png`}
                alt={coin?.name || ""}
                width={32}
                height={32}
                className="rounded-full"
              />
              <h2 className="text-2xl font-semibold font-robotoMono">
                {coin?.name}
              </h2>
            </div>

            <h1 className="text-4xl font-light font-robotoMono mr-4 flex justify-center items-end gap-4">
              <span className="font-normal text-lg text-light">Price:</span> $
              {coin?.price.toFixed(2)}
            </h1>
          </div>

          <div className="flex gap-4">
            <CoinChart coin={coin} />
            <TradeCard coin={coin} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinPage;
