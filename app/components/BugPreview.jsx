import Link from "next/link"
import moment from "moment"

import Severity from "./Severity"
import Tag from "./Tag"

export default function BugPreview({bug}) {
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