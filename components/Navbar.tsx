"use client"
import React from "react";
import { ThemeToggler } from "@/components/ThemeToggler";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { GithubIcon, TwitterIcon } from "./icons";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";


const Navbar = () => {
  return (
    <>
      <div className="py-3 px-4 w-full max-w-7xl m-auto flex justify-between items-center">
        <Link href={"/"} >
        <h1 className="dark:text-white font-semibold text-2xl ">
          CMS - AI/ML
        </h1>
        </Link>
        <div className="flex gap-3 items-center">
          <Button onClick={()=>signOut()} variant={"ghost"} className="border-opacity-20 border border-white">
            Sign out
          </Button>
          <ThemeToggler />
          <Link href={"https://x.com/CodeDevsharma"} target="_blank">
            <TwitterIcon />
          </Link>
          <Link href={"https://github.com/devsharmagit"} target="_blank">
            <GithubIcon />
          </Link>
        </div>
      </div>
      <Separator />
    </>
  );
};

export default Navbar;