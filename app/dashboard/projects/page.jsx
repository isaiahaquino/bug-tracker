"use client"

import { useState,  useEffect } from "react";

import Search from "../../components/Search";
import ProjectPreview from "../../components/ProjectPreview";
import { PlusIcon } from "@heroicons/react/24/solid"

export default function Projects() {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ title: "", desc: "" })
  const [projects, setProjects] = useState([])

  useEffect(() => {
    const getProjects = async () => {
      const resp = await fetch("/api/projects", { method: "GET" })
      return resp.json()
    }
    getProjects()
      .then(data => setProjects(data))
  }, [showForm])

  const changeMode = () => {
    setFormData({ title: "", desc: "" })
    setShowForm(showForm => !showForm)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const postProject = async () => {
      const resp = await fetch("/api/projects", {
        method: "POST",
        body: JSON.stringify(formData)
      })
      return resp.json()
    }

    postProject()
    changeMode()
  }

  return (
    <div className="flex flex-col pb-16 relative h-full">
      <div className="pb-10 flex justify-between items-end">
        <h1 className="text-3xl font-medium">Projects</h1>
        <Search />
      </div>

      <div className="flex flex-col gap-4">
        {projects.map((project) => {
            return <ProjectPreview project={project} key={project.id} />
        })}
      </div>

      {showForm ? (
          <form className="flex flex-col px-10 pt-10 pb-20 w-screen h-screen md:h-fit md:w-[500px] absolute right-0 md:right-20 bottom-0 md:border-[1px] border-b-0 rounded-b-none rounded-md border-gray-500 shadow-2x bg-white" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-semibold mb-4">Create A New Project</h1>
            <label htmlFor="title" className="mb-2">Title:</label>
            <input className="p-2 border-[1px] border-gray-300 mb-6" type="text" name="title" id="title" value={formData.title} onChange={handleChange} required/>
            <label htmlFor="desc" className="mb-2">Description:</label>
            <textarea className="p-2 border-[1px] border-gray-300 mb-6" name="desc" id="desc" rows={5} value={formData.desc} onChange={handleChange} required/>
            <div className="mt-8 flex self-end gap-4">
              <button className="px-6 py-2 border-[1px] rounded-sm" type="cancel" onClick={changeMode}>Cancel</button>
              <button className="px-6 py-2 bg-black text-white rounded-sm" type="submit">Submit</button>
            </div>
          </form>
        ) : (
          <div className="absolute right-2 bottom-6 md:right-20 md:bottom-20 bg-black rounded-full p-2" onClick={changeMode}>
            <PlusIcon className="h-9 text-white" />
          </div>
        )}
    </div>
  )
}