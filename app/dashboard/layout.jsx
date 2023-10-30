"use client"

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import Nav from "../components/Nav";

export default function DashboardLayout({ children }) {
  const session = useSession()

  if (session.status === "loading") return null

  if (!session.data) redirect("/auth")

  return (
    <div className="flex">
      <Nav />
      { children }
    </div>
  )
}