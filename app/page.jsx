"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Home() {
  const { data } = useSession()
  const router = useRouter()

  if (!data) {
    router.push("/auth")
  } else {
    router.push("/dashboard")
  }

  return (
    <main>
      <h1>home</h1>
    </main>
  )
}
