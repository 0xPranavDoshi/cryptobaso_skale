import Feature from "./feature";

const Features = () => {
  return (
    <div className="w-full h-screen flex pt-[100vh-16px] items-start justify-center">
      <div className="mt-[80px] w-3/4 flex flex-col">
        <h1 className="my-12 text-4xl font-robotoMono text-white">Features</h1>
        <div className="flex flex-wrap gap-8">
          <Feature
            title="Zero Gas Fees"
            description="Execute transactions without paying any gas fees, making trading more cost-effective."
          />
          <Feature
            title="Microtransactions"
            description="Better market condition checks and trade execution, minimizing the risk of price fluctuations and ensuring greater control."
          />
          <Feature
            title="Decentralized Limit Orders"
            description="Buy and sell orders executed automatically using smart contracts when conditions are met, without relying on centralized exchanges."
          />
          <Feature
            title="Secure"
            description="Protects your assets and transactions and ensures a safe trading environment."
          />
          <Feature
            title="Easy to use"
            description="User-friendly interface and intuitive design for seamless trading experience, suitable for both beginners and experienced traders."
          />
          <Feature
            title="Real-Time Market Analytics"
            description="Access comprehensive, up-to-the-minute market data and insights to make informed trading decisions."
          />
        </div>
      </div>
    </div>
  );
};

export default Features;
