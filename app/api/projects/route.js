import prisma from "../../../prisma/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"

export async function GET(req, res) {
  try {
    const session = await getServerSession(authOptions)
  
    if (!session) return new Response("Protected content.", { status: 401 })
    
    const result = await prisma.project.findMany({
      include: {
        bugs: {
          select: {
            severity: true
          }
        }
      }
    })
    
    return Response.json(result)
  } catch (error) {
    return new Response(error.message, { status: 500 })
  }
}

export async function POST(req, res) {
  const { title, desc } = await req.json()
  
  try {
    const session = await getServerSession(authOptions)

    if (!session) return new Response("Protected content.", { status: 401 })
    
    const result = await prisma.project.create({
      data: { title, desc }
    })

    return Response.json(result)
  } catch (error) {
    return new Response("Something went wrong.", { status: 500 })
  }
}