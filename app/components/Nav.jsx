"use client"

import Link from "next/link"
import { useState } from "react"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

import { SquaresPlusIcon, BugAntIcon, BoltIcon, ChatBubbleLeftIcon, Cog8ToothIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline"

export default function Nav() {
  const [page, setPage] = useState("Overview")
  const router = useRouter()

  const handleLogout = () => {
    setPage("Overview")
    // router.push("/")
    signOut({callbackUrl: '/auth'})
  }
  

  return (
    <div className="w-[300px] h-screen border-r-2 relative">
      <div className="text-center py-16 text-4xl text-teal-400">
        bug splat
      </div>

      <div className="flex flex-col">
        <ul className="text-xl text-gray-500">
          <li className={`pl-10 py-4 ${page === "Overview" && 'bg-slate-100 text-black'}`}>
            <Link href="/dashboard" className="flex gap-4" onClick={() => setPage("Overview")}>
              <SquaresPlusIcon className="w-8 align-middle" />
              Overview
            </Link>
          </li>
          <li className={`pl-10 py-4 ${page === "Projects" && 'bg-slate-100 text-black'}`}>
            <Link href="/dashboard/projects" className="flex gap-4" onClick={() => setPage("Projects")}>
              <BoltIcon className="w-8 align-middle" />
              Projects
            </Link>
          </li>
          <li className={`pl-10 py-4 ${page === "Reports" && 'bg-slate-100 text-black'}`}>
            <Link href="/dashboard/reports" className="flex gap-4" onClick={() => setPage("Reports")}>
              <BugAntIcon className="w-8 align-middle" />
              Reports
            </Link>
          </li>
          <li className={`pl-10 py-4 ${page === "Messages" && 'bg-slate-100 text-black'}`}>
            <Link href="/dashboard/messages" className="flex gap-4" onClick={() => setPage("Messages")}>
              <ChatBubbleLeftIcon className="w-8 align-middle" />
              Messages
            </Link>
          </li>
          <li className={`pl-10 py-4 ${page === "Settings" && 'bg-slate-100 text-black'}`}>
            <Link href="/dashboard/settings" className="flex gap-4" onClick={() => setPage("Settings")}>
              <Cog8ToothIcon className="w-8 align-middle" />
              Settings
            </Link>
          </li>
        </ul>
      </div>

      <div className="text-xl text-gray-500 absolute bottom-0 w-full">
        <button className="pl-10 py-4 mb-14 flex gap-4 w-full"  onClick={handleLogout}>
        <ArrowRightOnRectangleIcon className="w-8 align-middle" />
          Logout
        </button>
      </div>
    </div>
  )
}