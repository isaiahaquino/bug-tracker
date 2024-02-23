"use client"

import { useState, useEffect } from "react"

import BugPreview from "../../../components/BugPreview"
import Search from "../../../components/Search"
import Pagination from "../../../components/Pagination"

export default function Reports () {
  const [totalReports, setTotalReports] = useState([])
  const [reports, setReports] = useState([])
  const [rows, setRows] = useState(10)
  const [currIdx, setCurrIdx] = useState(1)

  useEffect(() => {
    fetch(`/api/reports`)
      .then(res => res.json())
      .then(data => setTotalReports(data))

    fetch(`/api/reports?skip=${currIdx-1}&take=${rows}`)
      .then(res => res.json())
      .then(data => setReports(data))
  }, [currIdx, rows])

  const changeRows = (e) => {
    setRows(e.target.value)
  }

  const changeIdx = (dir) => {
    if (dir === "L" && !(currIdx - rows < 0)) {
      setCurrIdx(currIdx-rows)
    } else if (dir === "R" && !(currIdx + rows > totalReports.length)) {
      setCurrIdx(currIdx+rows)
    }
  }

  if (!reports) return null

  return (
    <div className="flex flex-col flex-1">
      <div className="pb-10 flex justify-between items-end">
        <h1 className="text-3xl font-medium">To Do</h1>
        <Search />
      </div>

      <div className="rounded-xl mb-4 border-2 bg-slate-100 border-slate-100">
        <div className="grid grid-cols-10 w-full text-center p-2 ">
          <h2 className="col-span-2">Title</h2>
          <h2 className="col-span-4">Description</h2>
          <h2>Created</h2>
          <h2>Severity</h2>
          <h2>Progress</h2>
          <h2>Category</h2>
        </div>
        <div className="divide-y">
          {
            reports.map(report => {
              return <BugPreview bug={report} key={report.id}/>
            })
          }          
        </div>
      </div>

      <div className="self-end mr-4 mb-10">
        <Pagination total={totalReports.length} changeRows={changeRows} rows={rows} currIdx={currIdx} changeIdx={changeIdx} />
      </div>
    </div>
  )
}