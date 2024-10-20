import { CoinType } from "../models/coin";

export const USDC: CoinType = {
  name: "USDC",
  symbol: "USDC",
  slug: "usdc",
  price: 0,
  change: "0",
  percentageChange: "0",
  network: {
    name: "Ethereum",
    chainId: 1,
    rpcUrl: "",
    explorerUrl: "",
  },
};

export const ETH: CoinType = {
  name: "Ethereum",
  symbol: "ETH",
  slug: "ethereum",
  price: 0,
  change: "0",
  percentageChange: "0",
};

export const SKL: CoinType = {
  name: "Skale",
  symbol: "SKL",
  slug: "skale",
  price: 0,
  change: "0",
  percentageChange: "0",
};

export const USDT: CoinType = {
  name: "Tether",
  symbol: "USDT",
  slug: "tether",
  price: 0,
  change: "0",
  percentageChange: "0",
};

export const COINS: CoinType[] = [USDC, ETH, SKL, USDT];
