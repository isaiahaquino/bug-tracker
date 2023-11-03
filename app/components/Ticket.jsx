import moment from "moment"

import { ChatBubbleLeftIcon } from "@heroicons/react/24/solid"

export default function Ticket(props) {
  const ticket = props.ticket

  if (!ticket) return null

  return (
    <div className="flex flex-col gap-1 px-2 py-4 hover:bg-blue-100">
      <h1 className="text-xl font-semibold">{ticket.title}</h1>
      <h2 className="text-gray-500">{ticket.author?.name}, {moment(ticket.createdAt).fromNow()}</h2>
      <p className="py-3 text-slate-700">{ticket.desc}</p>
      <div className="flex justify-between">
        <p className={`${ticket.category === "UIDesign" && " text-pink-400"} ${ticket.category === "UXDesign" && " text-teal-400"} ${ticket.category === "Developing" && " text-blue-400"}
        }`}>#{ticket.category.toUpperCase()}</p>
        <div className="flex items-center gap-2 text-gray-500 mr-2">
          <ChatBubbleLeftIcon className="h-5"/>
          <p>{ticket.comments?.length || 0}</p>
        </div>
      </div>
    </div>
  )
}