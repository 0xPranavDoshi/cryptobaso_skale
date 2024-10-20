import Feature from "./feature";

const Features = () => {
  return (
    <div className="w-full h-screen flex pt-[100vh-16px] items-start justify-center">
      <div className="mt-[80px] w-3/4 flex flex-col">
        <h1 className="my-12 text-4xl font-robotoMono text-white">Features</h1>
        <div className="flex flex-wrap gap-8">
          <Feature
            title="Smart Contracts"
            description="Keeps ur funds secure. Also trustless"
          />
          <Feature
            title="Decentralized"
            description="No need to trust us. We are just a platform"
          />
          <Feature
            title="Transparent"
            description="All transactions are transparent and immutable"
          />
          <Feature
            title="Secure"
            description="Keeps ur funds secure. Also trustless"
          />
          <Feature
            title="Low Fees"
            description="Low fees for the transactions"
          />
          <Feature title="Easy to use" description="Simple and easy to use" />
        </div>
      </div>
    </div>
  );
};

export default Features;
