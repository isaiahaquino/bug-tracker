"use client"

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import Nav from "../components/Nav";

export default function DashboardLayout({ children }) {
  const session = useSession()

  if (session.status === "loading") return null

  if (!session.data) redirect("/auth")

  return (
    <div className="flex flex-col md:flex-row">
      <Nav />
      <div className="flex-1 px-4 md:px-10 pt-16 h-screen overflow-y-scroll">
        { children }
      </div>
    </div>
  )
}