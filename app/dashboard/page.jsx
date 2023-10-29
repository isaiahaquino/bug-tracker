"use client"

import { useSession } from "next-auth/react"


export default function Dashboard() {
  const { data } = useSession()
  console.log(data)

  if (!data) return null

  return (
    <div>
      <div>
        <h1 className="m-4 text-4xl font-bold">Hello { data.user.name.split(" ")[0] }!</h1>
      </div>
    </div>
  )
}