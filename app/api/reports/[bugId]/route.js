import prisma from "../../../../prisma/client"
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route"

export async function GET(res, { params }) {
  const id = params.bugId
  try {
    const bug = await prisma.bug.findUnique({ 
      where: { id },
      include: { 
        author: {
          select: { name: true }
        },
        project: {
          select: { title: true }
        },
        comments: {
          include: {
            author: { select: { name: true } }
          }
        }
      }
    })
    
    return Response.json(bug)
  } catch (error) {
    return new Response(error.message, { status: 500 })
  }
}

export async function POST(req, res) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return new Response("Protected content.", { status: 401 })

    const { content, author, bug } = await req.json()

    const result = await prisma.comment.create({
      data: {
        content,
        author: {
          connect: { id: author }
        },
        bug: {
          connect: { id: bug }
        },
      }
    })

    return Response.json(result)
  } catch (error) {
    return new Response(error.message, { status: 500 })
  }
}