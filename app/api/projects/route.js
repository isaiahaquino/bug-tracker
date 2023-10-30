import prisma from "../../../prisma/client"

export async function GET(req, res) {
  try {
    const result = await prisma.project.findMany()
    
    return Response.json(result)
  } catch (error) {
    return new Response(error.message, { status: 500 })
  }
}

export async function POST(req, res) {
  const { title, desc } = await req.json()

  try {
    const result = await prisma.project.create({
      data: {
        title, desc
      },
    })

    return Response.json(result)
  } catch (error) {
    return new Response("Something went wrong.", { status: 500 })
  }
}