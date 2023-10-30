

import { EllipsisHorizontalIcon, BugAntIcon } from "@heroicons/react/24/solid"

export default function ProjectPreview(props) {
  const project = props.project

  return (
    <div className="bg-white rounded-md p-4 flex justify-between">
      <div className="flex flex-col gap-4">
        <div className="flex gap-10">
          <h1 className="text-xl font-medium">{project.title}</h1>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 bg-yellow-400 rounded-md py-1 px-2 text-white">
              <BugAntIcon className="h-5"/>
              <p>{7}</p>
            </div>
            <div className="flex items-center gap-2 bg-orange-400 rounded-md py-1 px-2 text-white">
              <BugAntIcon className="h-5"/>
              <p>{3}</p>
            </div>
            <div className="flex items-center gap-2 bg-red-400 rounded-md py-1 px-2 text-white">
              <BugAntIcon className="h-5"/>
              <p>{4}</p>
            </div>
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