"use client"

import { signIn, signOut } from "next-auth/react"
import { useSession } from "next-auth/react"

export default function Home() {
  const { data, status, update } = useSession()
  const user = {
    email: "johnwick@gmail.com",
    password: "boogy"
  }


  return (
    <main className="">
      <button className="m-4 border-2 border-black p-2" onClick={() => signIn("credentials", {email: user.email, password: user.password})}>Sign In</button>
      <button className="m-4 border-2 border-black p-2" onClick={() => signOut()}>Sign Out</button>
    </main>
  )
}
