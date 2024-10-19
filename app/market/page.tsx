import Coin from "../components/market/coin";
import Navbar from "../components/navbar";

const Markets = () => {
  return (
    <div className="w-screen min-h-screen bg-background">
      <div className="w-[400px] h-[400px] blur-[720px] rounded-full fixed top-32 left-32 select-none bg-bubble"></div>
      <div className="w-[300px] h-[300px] blur-[720px] rounded-full fixed bottom-8 right-8 select-none bg-bubble"></div>
      <Navbar />

      <div className="pt-[calc(80px)] w-full h-full flex items-center justify-center">
        <div className="w-3/4 h-full flex flex-col">
          <h1 className="text-white text-3xl my-12 font-robotoMono">Markets</h1>

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
              <Coin
                slug="bitcoin"
                name="Bitcoin"
                price={10000}
                change="-$45"
                percentageChange="-6.24%"
              />
              <Coin
                slug="ethereum"
                name="Ethereum"
                price={10000}
                change="+$100"
                percentageChange="+10.12%"
              />
              <Coin
                slug="solana"
                name="Solana"
                price={10000}
                change="+$100"
                percentageChange="+10.12%"
              />
              <Coin
                slug="tether"
                name="Tether"
                price={10000}
                change="-$450"
                percentageChange="-13.57%"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Markets;
