import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import prisma from "../../../prisma/client"

export async function GET(req, res) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return new Response("Protected content.", { status: 401 })

    const result = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      }
    })

    return Response.json(result)
  } catch (error) {
    return new Response(error.message, { status: 500 })
  }
}