import { CoinPrices } from "@/app/data/price_data";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CoinType } from "@/app/models/coin";
import { useEffect, useState } from "react";

const CoinChart = ({ coin }: { coin: CoinType }) => {
  const [coinPrices, setCoinPrices] = useState<any[]>([]);

  useEffect(() => {
    const getCoinPrices = async () => {
      if (coinPrices.length > 0) return;

      const coinPrice = CoinPrices[coin.symbol as keyof typeof CoinPrices];
      if (coinPrice) {
        setCoinPrices(coinPrice);
        return;
      }

      const currentDate = new Date();
      const isoDateEndString = currentDate.toISOString();
      const isoDateStartString = new Date(
        currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
      ).toISOString();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/exchangerate/${coin.symbol}/USDC/history?period_id=7DAY&time_start=${isoDateStartString}&time_end=${isoDateEndString}&limit=7`,
        {
          headers: {
            "X-CoinAPI-Key": process.env.NEXT_PUBLIC_API_KEY || "",
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      console.log("data", data);
      setCoinPrices(data);
    };

    getCoinPrices();
  }, [coin, coinPrices.length]);

  const data = coinPrices.map((price) => {
    const date = new Date(price.time_period_start);

    return {
      name: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      rate: price.rate_open.toFixed(0),
    };
  });

  return (
    <div className="w-2/3 h-[30rem] -ml-8">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#B9B9B9FF" strokeWidth={1} />
          <YAxis
            domain={[
              (dataMin: number) => Math.floor(dataMin / 50) * 50,
              (dataMax: number) => Math.ceil(dataMax / 50) * 50,
            ]}
            tickFormatter={(value) => `$${value}`}
            stroke="#B9B9B9FF"
            strokeWidth={1}
            scale="linear"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1E1E1F",
              border: "none",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
            itemStyle={{ color: "#FFFFFF" }}
            labelStyle={{ color: "#82ca9d", fontWeight: "bold" }}
            cursor={{ stroke: "#82ca9d", strokeWidth: 2 }}
          />
          <Line
            type="monotone"
            dataKey="rate"
            stroke="#82ca9d"
            strokeOpacity={1}
            strokeWidth={2}
            activeDot={{ r: 7, stroke: "#1E1E1F", strokeWidth: 3 }}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CoinChart;
