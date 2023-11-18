"use client"

import moment from "moment"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useParams } from "next/navigation"

import { PlusIcon } from "@heroicons/react/24/solid"
import Ticket from '../../../components/Ticket'
import Search from "../../../components/Search"

export default function Projects () {
  const { data } = useSession()
  const { projectId } = useParams()
  const [formData, setFormData] = useState({ title: "", desc: "", category: "", progress: "", severity: 1, author: "", project: ""  })
  const [mode, setMode] = useState(false)
  const [project, setProject] = useState(null)

  useEffect(() => {
    setFormData({ ...formData, author: data.user.id, project: projectId})
    fetch(`/api/projects/${projectId}`)
      .then(res => res.json())
      .then(data => {
        setProject(data)
      })
  }, [data, projectId])

  const changeMode = () => {
    setMode(mode => !mode)
    setFormData({ ...formData, title: "", desc: "", category: "", progress: "", severity: 1 })
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value})
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("bug Form", formData)
    
    const postBug = async () => {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: "POST",
        body: JSON.stringify(formData)
      })
      return res.json()
    }

    postBug()
      .then(res => console.log("posted bug: ", res))
    changeMode()
  }

  if (!project) return null

  return (
    <div className="flex flex-col h-full mb-10 relative">
      <div className="pb-10 flex justify-between">
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-auto items-end">
          <h1 className="text-3xl font-medium">{project?.project.title}</h1>
          <p className="text-slate-600">Created on {moment(project?.project.createdAt).format('MMMM Do YYYY')}</p>
        </div>

        <Search />
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-6 relative">
        <div className="flex flex-col gap-3 flex-1">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold">To Do</h2>
            <p className="py-1 px-2 rounded-md bg-slate-100 text-sm">{project.todo.length}</p>
          </div>
          <div className="flex flex-col gap-3">
            { project.todo.map(bug => { return <Ticket ticket={bug} key={bug.id}/> })}
          </div>
        </div>
        <div className="flex flex-col gap-3 flex-1">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold">In Progress</h2>
            <p className="py-1 px-2 rounded-md bg-slate-100 text-sm">{project.inProg.length}</p>
          </div>
          <div className="flex flex-col gap-3">
            { project.inProg.map(bug => { return <Ticket ticket={bug} key={bug.id}/> })}
          </div>
        </div>
        <div className="flex flex-col gap-3 flex-1">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold">In Review</h2>
            <p className="py-1 px-2 rounded-md bg-slate-100 text-sm">{project.inRev.length}</p>
          </div>
          <div className="flex flex-col gap-3">
            { project.inRev.map(bug => { return <Ticket ticket={bug} key={bug.id}/> })}
          </div>
        </div>
        <div className="flex flex-col gap-3 flex-1">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold">Done</h2>
            <p className="py-1 px-2 rounded-md bg-slate-100 text-sm">{project.done.length}</p>
          </div>
          <div className="flex flex-col gap-3">
            { project.done.map(bug => { return <Ticket ticket={bug} key={bug.id}/> })}
          </div>
        </div>
      </div>

        {mode ? (
          <form className="flex flex-col px-10 pt-10 pb-20 w-screen h-screen md:w-[500px] absolute right-0 md:right-20 bottom-0 md:border-[1px] border-b-0 rounded-b-none rounded-md border-gray-500 shadow-2xl bg-white z-40" onSubmit={handleSubmit}>
            <h1 className="text-xl font-semibold mb-4">Create Bug Ticket</h1>
            <label htmlFor="title" className="mb-2">Title:</label>
            <input className="p-2 border-[1px] border-gray-300 mb-6" type="text" id="title" name="title" value={formData.title} onChange={handleChange} required/>
            <label htmlFor="desc" className="mb-2">Description:</label>
            <textarea className="p-2 border-[1px] border-gray-300 mb-6" id="desc" name="desc" rows={4} value={formData.desc} onChange={handleChange} required/>
            <fieldset className="mb-6">
              <legend className="mb-2">Category:</legend>
              <div className="flex gap-8">
                <p className="gap-1 flex">
                  <input type="radio" name="category" id="category1" value="UXDesign" onClick={handleChange} required/>
                  <label htmlFor="category1">UXDesign</label>
                </p>
                <p className="gap-1 flex">
                  <input type="radio" name="category" id="category2" value="UIDesign" onClick={handleChange}/>
                  <label htmlFor="category2">UIDesign</label>
                </p>
                <p className="gap-1 flex">
                  <input type="radio" name="category" id="category3" value="Developing" onClick={handleChange}/>
                  <label htmlFor="category3">Developing</label>
                </p>
              </div>
            </fieldset>
            <fieldset className="mb-6">
              <legend className="mb-2">Progress:</legend>
              <div className="flex gap-8">
                <p className="gap-1 flex">
                  <input type="radio" name="progress" id="progress1" value="To Do" onClick={handleChange} required/>
                  <label htmlFor="progress1">To Do</label>
                </p>
                <p className="gap-1 flex">
                  <input type="radio" name="progress" id="progress2" value="In Progress" onClick={handleChange}/>
                  <label htmlFor="progress2">In Progress</label>
                </p>
                <p className="gap-1 flex">
                  <input type="radio" name="progress" id="progress3" value="In Review" onClick={handleChange}/>
                  <label htmlFor="progress3">In Review</label>
                </p>
                <p className="gap-1 flex">
                  <input type="radio" name="progress" id="progress4" value="Done" onClick={handleChange}/>
                  <label htmlFor="progress4">Done</label>
                </p>
              </div>
            </fieldset>
            <fieldset className="mb-6">
              <legend className="mb-2">Severity:</legend>
              <div className="flex gap-8">
                <p className="gap-1 flex">
                  <input type="radio" name="severity" id="severity1" value={1} onClick={handleChange} required/>
                  <label htmlFor="severity1">Minor</label>
                </p>
                <p className="gap-1 flex">
                  <input type="radio" name="severity" id="severity2" value={2} onClick={handleChange}/>
                  <label htmlFor="severity2">Major</label>
                </p>
                <p className="gap-1 flex">
                  <input type="radio" name="severity" id="severity3" value={3} onClick={handleChange}/>
                  <label htmlFor="severity3">Critical</label>
                </p>
              </div>
            </fieldset>
            <div className="mt-8 flex self-end gap-4">
              <button className="px-6 py-2 border-[1px] rounded-sm" type="cancel" onClick={changeMode}>Cancel</button>
              <button className="px-6 py-2 bg-black text-white rounded-sm" type="submit">Submit</button>
            </div>
          </form>
        ) : (
          <div className="absolute right-4 bottom-0 md:right-20 md:bottom-20 bg-black rounded-full p-2" onClick={changeMode}>
            <PlusIcon className="h-9 text-white" />
          </div>
        )}

    </div>
  )
}