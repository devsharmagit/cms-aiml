"use client"
import { signOut, useSession } from "next-auth/react"


export default function Home() {
  const session = useSession()

  const handleSignout = ()=>{
    signOut()
  }
  return (
    <div>
      <button onClick={handleSignout} className="bg-white p-2 text-black rounded-lg">sign me out</button>
      this is text <br />
      {JSON.stringify(session)}
    </div>
  );
}
