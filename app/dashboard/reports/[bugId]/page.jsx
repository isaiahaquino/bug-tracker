"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import moment from "moment"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

import Severity from "../../../components/Severity"
import Tag from "../../../components/Tag"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import { PaperAirplaneIcon } from "@heroicons/react/24/outline"

function Comment({ comment }) {
  return (
    <div className="flex gap-4">
      <div className="w-[35px] h-[35px] bg-blue-300 flex justify-center rounded-full items-center">
        <h1 className=" font-extrabold text-white text-xl">{comment.author.name.charAt(0)}</h1>
      </div>
      <div>
        <h1 className="text-xl font-semibold my-1">{comment.author.name}</h1>
        <p className="">{comment.content}</p>
        <p className="text-sm text-slate-500">{moment(comment.createdAt).fromNow()}</p>
      </div>
    </div>
  )
}

export default function BugPage() {
  const { data } = useSession()
  const router = useRouter()
  const { bugId } = useParams()
  const [bug, setBug] = useState()
  const [formData, setFormData] = useState({ content: "", author: "", bug: "" })

  useEffect(() => {
    fetch(`/api/reports/${bugId}`)
      .then(res => res.json())
      .then(data => setBug(data))
    setFormData({...formData, author: data.user.id, bug: bugId})
  }, [data, bugId])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const postComment = async () => {
      const res = await fetch(`/api/reports/${bugId}`, {
        method: "POST",
        body: JSON.stringify(formData)
      })
      return res.json()
    }
    postComment()
      .then()
    setFormData({ ...formData, content: "" })
  }

  if (!bug) return null

  return (
    <div className="flex-1 flex max-h-screen">
      <div className="mx-14 my-16 flex flex-col gap-4 flex-1">
        <button onClick={() => router.back()} className="self-start mb-4 bg-slate-50 px-4 py-2"><ArrowLeftIcon className="h-6"/></button>
        <h2 className="text-xl font-medium text-gray-400">{bug.project.title}</h2>
        <h1 className="text-4xl font-semibold mb-4">{bug.title}</h1>
        <div className="mb-10 grid grid-cols-2 gap-y-3 items-center w-fit">
          <h3 className="text-lg text-gray-700">Severity:</h3>
          <Severity severity={bug.severity}/>
          <h3 className="text-lg text-gray-700">Progress:</h3>
          <h3>{bug.progress}</h3>
          <h3 className="text-lg text-gray-700">Created:</h3>
          <h3 className="text-lg">{moment(bug.createdAt).format("MMMM Do, YYYY")}</h3>
          <h3 className="text-lg text-gray-700">Tags:</h3>
          <Tag category={bug.category}/>
        </div>
        <p className=" tracking-wide text-lg">{bug.desc}</p>
      </div>

      <div className="flex-1 border-l-2 flex flex-col items-stretch justify-between p-8">
        <div>
          <h1 className="bg-white text-3xl py-10 font-semibold text-left rounded-lg">Comments</h1>
          <div className="flex flex-col gap-6 overflow-y-scroll">
            { bug.comments.map(comment => { return <Comment comment={comment} key={comment.id}/> }) }
          </div>
        </div>
        <form className="self-center flex w-full gap-4 bg-inherit" onSubmit={handleSubmit}>
          <input className="w-full px-4 py-3 border-b-2 bg-inherit" type="text" name="content" id="content" placeholder="type here..." value={formData.content} onChange={handleChange}/>
          <button className="bg-black py-2 px-3 text-white" type="submit"><PaperAirplaneIcon className="h-6"/></button>
        </form>
      </div>
    </div>
  )
}