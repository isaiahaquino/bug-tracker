"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { signOut } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"

import { SquaresPlusIcon, BugAntIcon, BoltIcon, ChatBubbleLeftIcon, Cog8ToothIcon, ArrowRightOnRectangleIcon, DocumentIcon } from "@heroicons/react/24/outline"
import { ChevronDownIcon, SquaresPlusIcon as SquaresPlusIconSolid, BugAntIcon as BugAntIconSolid, BoltIcon as BoltIconSolid, ChatBubbleLeftIcon as ChatBubbleLeftIconSolid, Cog8ToothIcon as Cog8ToothIconSolid } from "@heroicons/react/24/solid"

export default function Nav() {
  const router = useRouter()
  const pathname = usePathname()
  const [page, setPage] = useState("Overview")
  const [projects, setProjects] = useState([])

  useEffect(() => {
    fetch("/api/projects")
      .then(res => res.json())
      .then(data => setProjects(data))
  }, [])

  const handleLogout = () => {
    setPage("Overview")
    signOut({callbackUrl: '/auth'})
  }  

  return (
    <div className="w-[300px] h-screen border-r-2 relative">
      <div className="text-center py-16 text-4xl text-teal-400">
        bug splat
      </div>

      <div className="flex flex-col">
        <ul className="text-xl text-gray-500">
          <li className={`pl-10 py-4 ${pathname == "/dashboard" && 'bg-slate-100 text-black'}`}>
            <Link href="/dashboard" className="flex gap-4" onClick={() => setPage("Overview")}>
              { pathname == "/dashboard" ? <SquaresPlusIconSolid className="w-8 align-middle" /> : <SquaresPlusIcon className="w-8 align-middle" /> }
              Dashboard
            </Link>
          </li>
          <li className={`pl-10 pr-6 py-4 ${pathname.split("/")[2] == "projects" && 'bg-slate-100 text-black'}`}>
            <div className="flex justify-between items-center">
              <Link href="/dashboard/projects" className="flex gap-4" onClick={() => setPage("Projects")}>
                { pathname.split("/")[2] == "projects" ? <BoltIconSolid className="w-8 align-middle" /> : <BoltIcon className="w-8 align-middle" />}
                Projects
              </Link>
              { pathname.split("/")[2] == "projects" && <ChevronDownIcon className="h-5"/> }
            </div>
            { pathname.split("/")[2] == "projects" && (
              <div className="border-l-[3px] border-gray-300 ml-3 mt-2">
                { projects?.map(project => {
                  return (
                    <div className={`flex ml-2 pl-4 py-2 gap-3 items-center ${pathname.split("/")[3] == project.id && "bg-black text-white"}`} key={project.id}>
                      <DocumentIcon className="h-5"/>
                      <Link href={`/dashboard/projects/${project.id}`} className="text-base">{project.title}</Link>
                    </div>
                  )
                })}
              </div>
            )}
          </li>
          <li className={`pl-10 py-4 ${pathname == "/dashboard/reports" && 'bg-slate-100 text-black'}`}>
            <Link href="/dashboard/reports" className="flex gap-4" onClick={() => setPage("Reports")}>
              { pathname.split("/")[2] == "reports" ? <BugAntIconSolid className="w-8 align-middle" /> : <BugAntIcon className="w-8 align-middle" /> }
              Reports
            </Link>
          </li>
          <li className={`pl-10 py-4 ${pathname == "/dashboard/messages" && 'bg-slate-100 text-black'}`}>
            <Link href="/dashboard/messages" className="flex gap-4" onClick={() => setPage("Messages")}>
              { pathname.split("/")[2] == "messages" ? <ChatBubbleLeftIconSolid className="w-8 align-middle" /> : <ChatBubbleLeftIcon className="w-8 align-middle" /> }
              Messages
            </Link>
          </li>
          <li className={`pl-10 py-4 ${pathname == "/dashboard/settings" && 'bg-slate-100 text-black'}`}>
            <Link href="/dashboard/settings" className="flex gap-4" onClick={() => setPage("Settings")}>
              { pathname.split("/")[2] == "settings" ? <Cog8ToothIconSolid className="w-8 align-middle" /> : <Cog8ToothIcon className="w-8 align-middle" /> }
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