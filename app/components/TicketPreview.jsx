import moment from "moment"

import { ChatBubbleLeftIcon } from "@heroicons/react/24/solid"

export default function TicketPreview(props) {
  const ticket = props.ticket

  return (
    <div className="flex gap-1 justify-between p-2 hover:bg-blue-100">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold">{ticket.title}</h1>
        <h2 className="text-gray-500">{ticket.project}, {moment(ticket.createdAt).subtract(4, 'days').fromNow()}</h2>
      </div>
      <div className="flex justify-between">
        <div className="flex items-center gap-2 text-gray-500">
          <ChatBubbleLeftIcon className="h-7"/>
          <p className="text-xl">{ticket.comments.length}</p>
        </div>
      </div>
    </div>
  )
}