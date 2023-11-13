import prisma from "../../../../prisma/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"

export async function DELETE(req, {params}) {
  try {
    const id = params.commentId
    const session = await getServerSession(authOptions)
    if (!session) return new Response("Protected content.", { status: 401 })

    const comment = await prisma.comment.findUnique({
      where: { id }
    })

    let result
    if (comment.authorId === session.user.id) {
      result = await prisma.comment.delete({
        where: { id }
      })
    }

    return Response.json(result)
  } catch (error) {
    return new Response(error.message, { status: 500 })
  }
}