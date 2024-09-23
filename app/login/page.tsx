"use client";
import React from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { Boxes } from "@/components/ui/background-boxes";

const Page = () => {
  const handleClick = () => {
    try {
      signIn("google");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-full relative w-full overflow-hidden bg-[#121212] flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-[#121212] z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />
      <div className="border border-white border-opacity-40 relative z-21 rounded-lg p-5 text-center bg-[rgba(0,0,0,0.2)]">
        <h1 className="font-bold text-3xl dark:white ">CMS - AI/ML</h1>
        <p className="opacity-70 text-base py-3">
          A single place for all AI/ML notes.
        </p>
        <div
          onClick={handleClick}
          className="cursor-pointer border-white border bg-white text-black h-[40px] rounded-md px-8 py-2 flex justify-center items-center 
        gap-5"
        >
          <Image
            src={"/images/google.png"}
            alt="goole"
            width={30}
            height={30}
          />
          <p className="text-black text-base font-bold">
            Continue with Google.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
