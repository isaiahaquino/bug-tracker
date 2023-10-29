"use client"

import moment from "moment"
import { useState } from "react"

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { PlusIcon } from "@heroicons/react/24/solid"
import Ticket from '../../components/Ticket'

export default function Projects () {
  const [showForm, setShowForm] = useState(false)

  const title = "Project Title"
  const date = new Date()
  const sampleTicket = {
    title: "Spelling Mistake",
    description: "I still see there are many spelling mistakes all around the blog page.",
    category: "UXDesign",
    createdAt: new Date(),
    creator: "Isaiah Aquino",
    comments: ["Working on it.", "Any known mistakes that you can see?", "Need review."],
    progress: "R",
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="px-14 py-16 flex justify-between">
        <div className="flex gap-4 w-auto items-end">
          <h1 className="text-4xl font-semibold">{title}</h1>
          <p className="text-lg text-gray-500">Created on {moment(date).format('MMMM Do YYYY')}</p>
        </div>

        <div className="flex items-center gap-6">
          <div className="border-b-2 flex content-center py-4 text-gray-500 gap-3 items-center">
            <MagnifyingGlassIcon className="h-4" />
            <input type="text" id="search" name="Search" placeholder="Data, error, task etc .."></input>
          </div>
          <button className="bg-black text-white h-full w-28">Search</button>
        </div>
      </div>

      <div className="flex-1 flex gap-8 px-8 relative">
        <div className="flex flex-col gap-2 flex-1">
          <h2 className="text-2xl font-semibold">To Do</h2>
          <p className="text-gray-500">{}2 tasks available</p>
          <div className="h-[2px] bg-black my-4"></div>
          <Ticket ticket={sampleTicket} />
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <h2 className="text-2xl font-semibold">In Progress</h2>
          <p className="text-gray-500">{}2 tasks available</p>
          <div className="h-[2px] bg-black my-4"></div>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <h2 className="text-2xl font-semibold">In Review</h2>
          <p className="text-gray-500">{}2 tasks available</p>
          <div className="h-[2px] bg-black my-4"></div>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <h2 className="text-2xl font-semibold">Done</h2>
          <p className="text-gray-500">{}2 tasks available</p>
          <div className="h-[2px] bg-black my-4"></div>
        </div>

        {showForm ? (
          <div className="absolute right-20 bottom-0 border-[1px] border-b-0 rounded-b-none rounded-md border-gray-500 shadow-2xl bg-white">
            <form className="flex flex-col px-10 pt-10 pb-20 w-[500px]">
              <h1 className="text-2xl font-semibold mb-4">Create Bug Ticket</h1>
              <label htmlFor="title" className="mb-2">Title:</label>
              <input className="p-2 border-[1px] border-gray-300 mb-6" type="text" id="title" name="title"/>
              <label htmlFor="desc" className="mb-2">Description:</label>
              <textarea className="p-2 border-[1px] border-gray-300 mb-6" id="desc" name="desc" rows={4}/>
              <fieldset className="mb-6">
                <legend className="mb-2">Category:</legend>
                <div className="flex gap-8">
                  <p className="gap-1 flex">
                    <input type="radio" name="category" value="UXDesign" />
                    <label htmlFor="category">UXDesign</label>
                  </p>
                  <p className="gap-1 flex">
                    <input type="radio" name="category" value="UIDesign" />
                    <label htmlFor="category">UIDesign</label>
                  </p>
                  <p className="gap-1 flex">
                    <input type="radio" name="category" value="Developing" />
                    <label htmlFor="category">Developing</label>
                  </p>
                </div>
              </fieldset>
              <fieldset className="mb-6">
                <legend className="mb-2">Progress:</legend>
                <div className="flex gap-8">
                  <p className="gap-1 flex">
                    <input type="radio" name="progress" value="T" />
                    <label htmlFor="progress">To Do</label>
                  </p>
                  <p className="gap-1 flex">
                    <input type="radio" name="progress" value="P" />
                    <label htmlFor="progress">In Progress</label>
                  </p>
                  <p className="gap-1 flex">
                    <input type="radio" name="progress" value="R" />
                    <label htmlFor="progress">In Review</label>
                  </p>
                  <p className="gap-1 flex">
                    <input type="radio" name="progress" value="D" />
                    <label htmlFor="progress">Done</label>
                  </p>
                </div>
              </fieldset>
              <div className="mt-8 flex self-end gap-4">
                <button className="px-6 py-2 border-[1px] rounded-sm" onClick={() => setShowForm(false)}>Cancel</button>
                <button className="px-6 py-2 bg-black text-white rounded-sm" type="submit">Submit</button>
              </div>
            </form>
          </div>
        ) : (
          <div className="absolute right-20 bottom-20 bg-black rounded-full p-2" onClick={() => setShowForm(true)}>
            <PlusIcon className="h-9 text-white" />
          </div>
        )}

        
        
        
      </div>
    </div>
  )
}