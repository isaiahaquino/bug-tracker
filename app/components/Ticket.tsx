import moment from "moment"

import { Ticket } from "../types"
import { ChatBubbleLeftIcon } from "@heroicons/react/24/solid"


export default function Ticket(props:Ticket) {
  const ticket = props.ticket

  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-xl font-semibold">{ticket.title}</h1>
      <h2 className="text-gray-500">{ticket.creator}, {moment(ticket.createdAt).format('ll')}</h2>
      <p className="py-3 text-slate-700">{ticket.description}</p>
      <div className="flex justify-between">
        <p className={`${ticket.category === "UIDesign" && " text-pink-400"} ${ticket.category === "UXDesign" && " text-teal-400"} ${ticket.category === "Developing" && " text-blue-400"}
        }`}>#{ticket.category.toUpperCase()}</p>
        <div className="flex items-center gap-2 text-gray-500">
          <ChatBubbleLeftIcon className="h-5"/>
          <p>{ticket.comments.length}</p>
        </div>
      </div>
    </div>
  )
}