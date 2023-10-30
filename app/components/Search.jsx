
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"

export default function Search() {
  return (
    <div className="flex items-center gap-6 h-full">
      <div className="border-b-2 flex content-center py-4 text-gray-500 gap-3 items-center">
        <MagnifyingGlassIcon className="h-4" />
        <input type="text" id="search" name="Search" placeholder="Data, error, task etc .."></input>
      </div>
      <button className="bg-black text-white h-full w-28">Search</button>
    </div>
  )
}