"use client";

import { useEffect, useState } from "react";
import Coin from "../components/market/coin";
import Navbar from "../components/navbar";
import { CoinType } from "../models/coin";

const Markets = () => {
  const COIN_SYMBOLS = ["SKL", "ETH", "USDT"];

  const [coins, setCoins] = useState<CoinType[]>([]);

  const fetchCoins = async () => {
    const coins = await Promise.all(
      COIN_SYMBOLS.map(async (symbol) => {
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

        const currentDate = new Date();
        const isoDateEndString = currentDate.toISOString();
        const isoDateStartString = new Date(
          currentDate.getTime() - 2 * 24 * 60 * 60 * 1000
        ).toISOString();

        const response_change = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/exchangerate/${symbol}/USD/history?period_id=1DAY&time_start=${isoDateStartString}&time_end=${isoDateEndString}&limit=2`,
          {
            headers: {
              "X-CoinAPI-Key": process.env.NEXT_PUBLIC_API_KEY || "",
              "Content-Type": "application/json",
            },
          }
        );

        const data_change = await response_change.json();

        console.log("data change", data_change);

        return {
          symbol: symbol,
          slug:
            symbol === "USDT"
              ? "tether"
              : symbol === "ETH"
              ? "ethereum"
              : "skale",
          name:
            symbol === "USDT"
              ? "Tether"
              : symbol === "ETH"
              ? "Ethereum"
              : "Skale",
          price: data_price.rate,
          change: (data_change[0].rate_close - data_change[1].rate_close)
            .toFixed(5)
            .toString(),
          percentageChange:
            (
              ((data_change[0].rate_close - data_change[1].rate_close) /
                data_change[1].rate_close) *
              100
            )
              .toFixed(5)
              .toString() + "%",
        } as CoinType;
      })
    );

    setCoins(coins);
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  return (
    <div className="w-screen min-h-screen bg-background">
      <div className="w-[400px] h-[400px] blur-[720px] rounded-full fixed top-32 left-32 select-none bg-bubble"></div>
      <div className="w-[300px] h-[300px] blur-[720px] rounded-full fixed bottom-32 right-16 select-none bg-bubble"></div>
      <Navbar />

      <div className="pt-[calc(80px)] w-full h-full flex items-center justify-center">
        <div className="w-3/4 h-full flex flex-col">
          <h1 className="text-white text-3xl my-12 font-robotoMono">Market</h1>

          <table className="table-auto">
            <thead>
              <tr>
                <th className="text-left font-inriaSans text-light font-light">
                  Name
                </th>
                <th className="text-left font-inriaSans text-light font-light">
                  Price
                </th>
                <th className="text-left font-inriaSans text-light font-light">
                  Change
                </th>
                <th className="text-left font-inriaSans text-light font-light">
                  Percentage Change
                </th>
                <th className="text-right pr-4 font-inriaSans text-light font-light">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {coins.map((coin) => (
                <Coin key={coin.slug} {...coin} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Markets;
