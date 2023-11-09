import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid"

export default function Pagination({total, rows, changeRows, currIdx, changeIdx}) {
  return (
    <div className="flex justify-center gap-6">
      <div className="flex justify-center gap-2">
        <p>Rows per page:</p>
        <select name="rows" id="rows" onChange={changeRows}>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
      </div>

      <p>{currIdx}-{ currIdx+rows-1 > total ? total : currIdx+rows-1} of {total}</p>

      <div className="flex gap-3">
        <button onClick={() => changeIdx("L")}><ArrowLeftIcon className="h-5"/></button>
        <button onClick={() => changeIdx("R")}><ArrowRightIcon className="h-5"/></button>
      </div>
    </div>
  )
}