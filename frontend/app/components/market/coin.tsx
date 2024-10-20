"use client";

import { PrimaryButton } from "@/app/ui/button";
import Image from "next/image";
import { CoinType } from "@/app/models/coin";
import { useRouter } from "next/navigation";

const Coin = (coin: CoinType) => {
  const router = useRouter();

  return (
    <tr className="border-b border-light/[.30]">
      <td className="text-white text-lg font-inriaSans">
        <div className="flex items-center gap-4">
          <Image
            src={`/coins/${coin.slug}.png`}
            alt={coin.name}
            width={32}
            height={32}
          />
          <span>{coin.name}</span>
        </div>
      </td>
      <td className="text-white text-lg font-inriaSans">{coin.network.name}</td>
      <td className="text-white text-lg font-inriaSans">
        ${coin.price.toFixed(2)}
      </td>
      <td
        className={`text-lg font-inriaSans ${
          coin.change.startsWith("-") ? "text-red-400" : "text-emerald-400"
        }`}
      >
        {coin.change}
      </td>
      <td
        className={`text-lg font-inriaSans ${
          coin.percentageChange.startsWith("-")
            ? "text-red-400"
            : "text-emerald-400"
        }`}
      >
        {coin.percentageChange}
      </td>
      <td className="py-4 text-right">
        <PrimaryButton
          small
          text="View Details"
          onClick={() => router.push(`/coin/${coin.slug}`)}
        />
      </td>
    </tr>
  );
};

export default Coin;
