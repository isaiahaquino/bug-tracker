import prisma from "../../../prisma/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"

export async function GET(req, res) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return new Response("Protected content.", { status: 401 })

    const result = await prisma.comment.findMany({
      where: {
        bug: { 
          authorId: session.user.id 
        }
      },
      include: {
        author: {
          select: { name: true }
        },
        bug: {
          select: { title: true }
        }
      },
      orderBy: { createdAt: "desc" },
      take: 5,
    })

    return Response.json(result)
  } catch (error) {
    return new Response(error.message, { status: 500 })
  }
}

