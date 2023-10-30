"use client"

import { useSession } from "next-auth/react"
import TicketPreview from "../components/TicketPreview"

const sampleTicket = {
  title: "Spelling Mistake",
  description: "I still see there are many spelling mistakes all around the blog page.",
  category: "UXDesign",
  createdAt: new Date(),
  creator: "Isaiah Aquino",
  comments: ["Working on it.", "Any known mistakes that you can see?", "Need review."],
  progress: "R",
  project: "tanaman.id"
}

export default function Dashboard() {
  const { data, isLoading } = useSession()

  if (isLoading) return null

  return (
    <div className="flex flex-col px-10 flex-1">
      <div className="py-20">
        <h1 className="text-4xl font-medium">Welcome back, { data?.user?.name.split(" ")[0] }</h1>
      </div>

      <div className="flex h-full gap-10">
        <div className="flex-1">
           {/* TO DO TASKS */}
           <h2 className="text-2xl font-semibold">To Do Tasks</h2>
           <div className="h-[2px] bg-black my-4"></div>
           <div className="flex flex-col divide-y-2">
            <TicketPreview ticket={sampleTicket} />
            <TicketPreview ticket={sampleTicket} />
            <TicketPreview ticket={sampleTicket} />
           </div>
        </div>
        <div className="flex-1 flex flex-col gap-10">
          <div>
            <h2 className="text-2xl font-semibold">Summary</h2>
            <div className="h-[2px] bg-black my-4"></div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Recent Comments</h2>
            <div className="h-[2px] bg-black my-4"></div>
          </div>
        </div>
      </div>
    </div>
  )
}