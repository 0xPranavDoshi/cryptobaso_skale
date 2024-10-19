"use client";

import { PrimaryButton } from "@/app/ui/button";
import Image from "next/image";

interface CoinProps {
  name: string;
  price: number;
  change: string;
  percentageChange: string;
}

const Coin = ({ name, price, change, percentageChange }: CoinProps) => {
  return (
    <tr className="border-b border-light/[.30]">
      <td className="text-white text-lg font-inriaSans">
        <div className="flex items-center gap-4">
          <Image src={`/coins/${name}.png`} alt={name} width={32} height={32} />
          <span>{name}</span>
        </div>
      </td>
      <td className="text-white text-lg font-inriaSans">${price}</td>
      <td
        className={`text-lg font-inriaSans ${
          change.startsWith("-") ? "text-red-400" : "text-emerald-400"
        }`}
      >
        {change}
      </td>
      <td
        className={`text-lg font-inriaSans ${
          percentageChange.startsWith("-") ? "text-red-400" : "text-emerald-400"
        }`}
      >
        {percentageChange}
      </td>
      <td className="py-4 text-right">
        <PrimaryButton small text="View Details" onClick={() => {}} />
      </td>
    </tr>
  );
};

export default Coin;
