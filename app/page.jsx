"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Home() {
  const { data } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!data) {
      router.push("/auth")
    } else {
      router.push("/dashboard")
    }
  }, [data,router])

  return (
    <main>

    </main>
  )
}
