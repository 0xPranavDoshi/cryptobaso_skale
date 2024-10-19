import { EthPrices } from "@/app/data/coin_data";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CoinChart = () => {
  const data = EthPrices.map((price) => {
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
