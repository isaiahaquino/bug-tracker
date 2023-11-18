"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import moment from "moment"

import { EllipsisVerticalIcon } from "@heroicons/react/24/solid"
import Severity from "../components/Severity"
import Link from "next/link"

function UserPreview({ user }) {
  return (
    <div className="flex px-6 py-2 gap-4 items-center">
      <div className="w-[35px] h-[35px] bg-violet-300 flex justify-center rounded-full items-center">
        <h1 className="font-bold text-white text-xl">{user.name.charAt(0)}</h1>
      </div>
      <div className="flex-1">
        <h1 className="text-lg font-medium">{user.name}</h1>
        <h2 className=" text-blue-600 text-sm">{user.email}</h2>
      </div>
      <button onClick={() => {}}>
        <EllipsisVerticalIcon className="h-7"/>
      </button>
    </div>
  )
}

function ReportPreview({report}) {
  return (
    <Link href={`/dashboard/reports/${report.id}`} className="px-6 py-2 flex justify-between items-center">
      <div>
        <h1 className="text-lg font-medium">{report.title}</h1>
        <h2 className="text-slate-600 text-sm">{report.project.title}, {moment(report.createdAt).fromNow()}</h2>
      </div>
      <Severity severity={report.severity}/>
    </Link>
  )
}

function CommentPreview({comment}) {
  return (
    <Link href={`/dashboard/reports/${comment.bugId}`} className="px-6 py-2 flex">
      <div className="flex flex-col flex-1">
        <h1 className="font-semibold">{comment.bug.title}</h1>
        <p>{comment.content}</p>
        <p className="text-slate-500 text-sm">{comment.author.name}, {moment(comment.createdAt).fromNow()}</p>
      </div>  
      <div className="pt-2">
        <EllipsisVerticalIcon className="h-6"/>
      </div>  
    </Link>
  )
}

export default function Dashboard() {
  const { data, isLoading } = useSession()
  const [todo, setTodo] = useState([])
  const [inProgress, setInProgress] = useState([])
  const [team, setTeam] = useState([])
  const [recentComments, setRecentComments] = useState([])

  useEffect(() => {
    fetch("/api/users")
      .then(res => res.json())
      .then(res => setTeam(res))
    fetch("/api/reports?prev=todo")
      .then(res => res.json())
      .then(res => setTodo(res))
    fetch("/api/reports?prev=inProg")
      .then(res => res.json())
      .then(res => setInProgress(res))
    fetch("/api/comments")
      .then(res => res.json())
      .then(res => setRecentComments(res))
  }, [])

  if (isLoading) return null

  return (
    <div className="flex flex-col">
      <div className="pb-10">
        <h1 className="text-3xl font-medium">Welcome back, { data?.user?.name.split(" ")[0] }</h1>
      </div>

      <div className="flex flex-1 gap-10 pb-10 flex-col-reverse lg:flex-row">
        <div className="flex-1 flex flex-col gap-10">
          <div className="flex flex-col rounded-lg border-2 divide-y-2">
            <div>
              <h2 className="text-xl font-semibold py-4 px-6">To Do Tasks</h2>
            </div>
            <div className="flex flex-col">
              { todo.map(report => { return <ReportPreview report={report} key={report.id}/> }) }
            </div>
          </div>

          <div className="flex flex-col rounded-lg border-2 divide-y-2">
            <div>
              <h2 className="text-xl font-semibold py-4 px-6">In Progress</h2>
            </div>
            <div className="flex flex-col">
              { inProgress.map(report => { return <ReportPreview report={report} key={report.id}/> }) }
            </div>
          </div>
        </div>
        

        <div className="flex-1 flex flex-col gap-10">
          <div className="flex flex-col rounded-lg border-2 divide-y-2">
            <div>
              <h2 className="text-xl font-semibold py-4 px-6">Team Members</h2>
            </div>
            <div>
              { team.map(user => { return <UserPreview user={user} key={user.id}/> }) }
            </div>
          </div>
          <div className="flex flex-col rounded-lg border-2 divide-y-2">
            <div>
              <h2 className="text-xl font-semibold py-4 px-6">Recent Comments</h2>
            </div>
            <div className="flex flex-col">
              {recentComments.map(comment => { return <CommentPreview comment={comment} key={comment.id}/> })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}