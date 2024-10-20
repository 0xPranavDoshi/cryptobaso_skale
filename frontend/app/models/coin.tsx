export interface CoinType {
  name: string;
  symbol: string;
  slug: string;
  price: number;
  change: string;
  percentageChange: string;
  network: {
    name: string;
    chainId: string;
    rpcUrl: string;
    explorerUrl: string;
  };
}
