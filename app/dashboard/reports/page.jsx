"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import moment from "moment"

import Search from "../../components/Search"
import Severity from "../../components/Severity"
import Tag from "../../components/Tag"
import Pagination from "../../components/Pagination"
import { useSearchParams } from "next/navigation"

export function BugPreview({bug}) {
  return (
    <Link href={`/dashboard/reports/${bug.id}`} className="text-sm grid grid-cols-10 w-full items-center justify-items-center p-2 bg-white">
      <div className="justify-self-start pl-4 col-span-2 flex flex-col">
        <h1 className="font-semibold">{bug.title}</h1>
        <p className="text-gray-500">{bug.project.title}</p>
      </div>
      <p className="col-span-4 justify-self-start">{bug.desc}</p>
      <p>{moment(bug.createdAt).format("MM/DD/YYYY")}</p>
      <Severity severity={bug.severity}/>
      <p>{bug.progress}</p>
      <Tag category={bug.category}/>
    </Link>
  )
}

export default function Reports () {
  const searchParams = useSearchParams()
  const [totalReports, setTotalReports] = useState([])
  const [reports, setReports] = useState([])
  const [rows, setRows] = useState(10)
  const [currIdx, setCurrIdx] = useState(1)
  const [search, setSearch] = useState("")

  useEffect(() => {
    const searchQuery = searchParams.get("search")
    if (searchQuery) { setSearch(`search=${searchQuery}`)}

    fetch(`/api/reports?${search}`)
      .then(res => res.json())
      .then(data => setTotalReports(data))

    getReports()
      .then(data => setReports(data))
  }, [search])

  useEffect(() => {
    getReports()
      .then(data => setReports(data))
  }, [currIdx, rows])

  const changeRows = (e) => {
    setRows(e.target.value)
  }

  const getReports = async () => {
    const result = await fetch(`/api/reports?${search}&skip=${currIdx-1}&take=${rows}`)
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
    <div className="flex flex-col flex-1">
      <div className="pb-10 flex justify-between items-end">
        <h1 className="text-3xl font-medium">Reports</h1>
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