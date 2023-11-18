"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { signOut } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"

import { SquaresPlusIcon, BugAntIcon, BoltIcon, ArrowRightOnRectangleIcon, DocumentIcon } from "@heroicons/react/24/outline"
import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/24/solid"

export default function Nav() {
  const router = useRouter()
  const pathname = usePathname()
  const [mobileNav, setMobileNav] = useState(false)

  const handleMobileNav = () => {
    setMobileNav(!mobileNav)
  }

  const handleLogout = () => {
    signOut({callbackUrl: '/auth'})
  }  

  return (
    <div className="h-200px w-screen md:w-[250px] md:h-screen relative md:border-r-2 z-50">
      <div className="p-4 md:p-0 text-teal-500 font-medium flex items-center justify-between">
        <h1 className="md:text-center md:pt-14 md:pb-10 w-full text-2xl md:text-3xl">bug splat</h1>
        <button className={`md:hidden`} onClick={handleMobileNav}>
          { mobileNav ? <XMarkIcon className="h-6 text-black"/> : <Bars3BottomRightIcon className="h-6 text-black"/> }
        </button>
      </div>

      <div className={`${mobileNav ? "" : "hidden"} md:block md:shadow-none absolute w-full bg-white bg-opacity-100 shadow-2xl`}>
        <div className="flex flex-col">
          <ul className="text-lg text-slate-700">
            <li className={`pl-6 py-4 my-2 mx-4 rounded-2xl ${pathname == "/dashboard" && 'bg-black text-white'}`}>
              <Link href="/dashboard" className="flex gap-3" onClick={handleMobileNav}>
                <SquaresPlusIcon className="w-6 align-middle" />
                Dashboard
              </Link>
            </li>
            <li className={`pl-6 py-4 my-2 mx-4 rounded-2xl ${pathname.split("/")[2] == "projects" && 'bg-black text-white'}`}>
              <div className="flex justify-between items-center">
                <Link href="/dashboard/projects" className="flex gap-4" onClick={handleMobileNav}>
                  <BoltIcon className="w-6 align-middle" />
                  Projects
                </Link>
              </div>
            </li>
            <li className={`pl-6 py-4 my-2 mx-4 rounded-2xl ${pathname.split("/")[2] == "reports" && 'bg-black text-white'}`}>
              <Link href="/dashboard/reports" className="flex gap-4" onClick={handleMobileNav}>
                <BugAntIcon className="w-6 align-middle" />
                Reports
              </Link>
            </li>
          </ul>
        </div>

        <div className="text-lg text-slate-700 w-full">
          <button className="pl-6 py-4 mb-4 mx-4 flex gap-4 w-full"  onClick={handleLogout}>
          <ArrowRightOnRectangleIcon className="w-6 align-middle" />
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}