import { FlagIcon } from "@heroicons/react/20/solid"

export default function Severity({ severity }) {
  switch (severity) {
    case 1:
      return <div className="text-white bg-yellow-300 p-2 flex gap-1 w-fit items-center rounded-md"><FlagIcon className="h-4"/><h1>Minor</h1></div>
    case 2:
      return <div className="text-white bg-orange-300 p-2 flex gap-1 w-fit items-center rounded-md"><FlagIcon className="h-4"/><h1>Major</h1></div>
    case 3:
      return <div className="text-white bg-red-300 p-2 flex gap-1 w-fit items-center rounded-md"><FlagIcon className="h-4"/><h1>Critical</h1></div>
    default:
      return <></>
  }
}