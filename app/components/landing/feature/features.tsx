import Feature from "./feature";

const Features = () => {
  return (
    <div className="w-full h-screen flex pt-[100vh-16px] items-start justify-center">
      <div className="w-3/4 flex flex-col">
        <h1 className="text-5xl font-light font-robotoMono text-white">
          Features
        </h1>
        <div className="flex flex-col gap-8">
          <Feature />
          <Feature />
          <Feature />
        </div>
      </div>
    </div>
  );
};

export default Features;
