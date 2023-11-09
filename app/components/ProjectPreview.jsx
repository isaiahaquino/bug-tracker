import Link from "next/link"

import { EllipsisHorizontalIcon, BugAntIcon } from "@heroicons/react/24/solid"

export default function ProjectPreview(props) {
  const project = props.project
  let [minor, major, critical] = [0, 0, 0]

  const getBugCount = () => {
    project.bugs.forEach(bug => {
      if (bug.severity === 1) minor++
      else if (bug.severity === 2) major++
      else if (bug.severity === 3) critical++
    })
  }

  getBugCount()

  return (
    <div className="bg-white rounded-md p-4 flex justify-between">
      <div className="flex flex-col gap-4">
        <div className="flex gap-10">
          <Link className="text-xl font-medium" href={`/dashboard/projects/${project.id}`}>{project.title}</Link>
          <div className="flex gap-4">
            { minor !== 0 && 
              <div className="flex items-center gap-2 bg-yellow-400 rounded-md py-1 px-2 text-white">
                <BugAntIcon className="h-5"/>
                <p>{minor}</p>
              </div>
            }
            { major !== 0 && 
              <div className="flex items-center gap-2 bg-orange-400 rounded-md py-1 px-2 text-white">
                <BugAntIcon className="h-5"/>
                <p>{major}</p>
              </div>
            }
            { critical !== 0 && 
              <div className="flex items-center gap-2 bg-red-400 rounded-md py-1 px-2 text-white">
                <BugAntIcon className="h-5"/>
                <p>{critical}</p>
              </div>
            }
          </div>
        </div>
        <p className="text-gray-500">{project.desc}</p>
      </div>
      <div className="flex flex-col">
        <EllipsisHorizontalIcon className="h-8" />
        <div className="flex">        
        
        </div>
      </div>
    </div>
  )
}