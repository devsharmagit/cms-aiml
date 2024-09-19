"use client"
import React from 'react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';

const page = () => {

  const handleClick = ()=>{
  signIn("google")
  }

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='border border-white border-opacity-40 rounded-lg p-5 text-center'>
        <h1 className='font-bold text-3xl dark:white '>
          CMS - AI/ML
        </h1>
        <p className='opacity-70 text-base py-3'>
          A single place for all AI/ML notes.
        </p>
        <div onClick={handleClick} className='cursor-pointer border-white border bg-white text-black rounded-md px-8 py-2 flex justify-center items-center 
        gap-5'>
<Image src={"/images/google.png"} alt='goole' width={30} height={30} />
<p className='text-black text-base font-bold'>
  Continue with Google.
</p>
        </div>
      </div>
    </div>
  )
}

export default page
