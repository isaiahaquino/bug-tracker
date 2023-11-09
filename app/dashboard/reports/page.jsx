"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import moment from "moment"

import Search from "../../components/Search"
import Severity from "../../components/Severity"
import Tag from "../../components/Tag"
import Pagination from "../../components/Pagination"

export function BugPreview({bug}) {
  return (
    <Link href={`/dashboard/reports/${bug.id}`} className="grid grid-cols-8 w-full  bg-white items-center justify-items-center p-2 border-b-2 border-slate-50">
      <div className="justify-self-start flex flex-col">
        <h1 className="font-bold">{bug.title}</h1>
        <p className="text-sm text-gray-500">{bug.project.title}</p>
      </div>
      <p className="col-span-3 justify-self-start">{bug.desc}</p>
      <p>{moment(bug.createdAt).format("MM/DD/YYYY")}</p>
      <Severity severity={bug.severity}/>
      <p>{bug.progress}</p>
      <Tag category={bug.category}/>
    </Link>
  )
}

export default function Reports () {
  const [totalReports, setTotalReports] = useState([])
  const [reports, setReports] = useState([])
  const [rows, setRows] = useState(10)
  const [currIdx, setCurrIdx] = useState(1)

  useEffect(() => {
    fetch("/api/reports")
      .then(res => res.json())
      .then(data => setTotalReports(data))

    getReports()
      .then(data => setReports(data))
  }, [])

  useEffect(() => {
    getReports()
      .then(data => setReports(data))
  }, [currIdx, rows])

  const changeRows = (e) => {
    setRows(e.target.value)
  }

  const getReports = async () => {
    const result = await fetch(`/api/reports?skip=${currIdx-1}&take=${rows}`)
    return result.json()
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
    <div className="flex flex-col flex-1 px-10 max-h-screen overflow-y-scroll">
      <div className="pt-20 pb-10 flex justify-between items-end">
        <h1 className="text-4xl font-medium">Reports</h1>
        <Search />
      </div>

      <div className="bg-slate-50 rounded-md p-2 mb-4">
        <div className="grid grid-cols-8 w-full text-center bg-white font-medium text-xl p-2 border-b-8 border-slate-50">
          <h2>TITLE</h2>
          <h2 className="col-span-3">DESCRIPTION</h2>
          <h2>CREATED</h2>
          <h2>SEVERITY</h2>
          <h2>PROGRESS</h2>
          <h2>CATEGORY</h2>
        </div>
        {
          reports.map(report => {
            return <BugPreview bug={report} key={report.id}/>
          })
        }
      </div>

      <div className="self-end mr-4 mb-10">
        <Pagination total={totalReports.length} changeRows={changeRows} rows={rows} currIdx={currIdx} changeIdx={changeIdx} />
      </div>

      

    </div>
  )
}