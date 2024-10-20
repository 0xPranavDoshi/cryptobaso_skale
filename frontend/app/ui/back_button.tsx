"use client";

import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";

export const BackButton = () => {
  const router = useRouter();

  return (
    <div
      className="flex items-center gap-2 cursor-pointer"
      onClick={() => router.back()}
    >
      <IoIosArrowBack className="text-2xl" />
      <h1 className="text-lg font-semibold font-robotoMono">Back</h1>
    </div>
  );
};
