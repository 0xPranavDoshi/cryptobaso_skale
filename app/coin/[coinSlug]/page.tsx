import Navbar from "@/app/components/navbar";

const CoinPage = ({ params }: { params: { coinSlug: string } }) => {
  return (
    <div className="w-screen min-h-screen bg-background">
      <div className="w-[400px] h-[400px] blur-[720px] rounded-full fixed top-32 left-32 select-none bg-bubble"></div>
      <div className="w-[300px] h-[300px] blur-[720px] rounded-full fixed bottom-8 right-8 select-none bg-bubble"></div>

      <Navbar />
    </div>
  );
};

export default CoinPage;
