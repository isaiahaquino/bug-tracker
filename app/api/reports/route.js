import prisma from "../../../prisma/client";

export async function GET(req, res) {
  try {
    if (!req.nextUrl.searchParams.get("skip")) {
      const result = await prisma.bug.findMany({
        include: {
          project: {
            select: { title: true }
          }
        }
      })
      return Response.json(result)
    } else {
      const result = await prisma.bug.findMany({
        skip: Number(req.nextUrl.searchParams.get("skip")),
        take: Number(req.nextUrl.searchParams.get("take")),
        include: {
          project: {
            select: { title: true }
          }
        }
      })
      return Response.json(result)
    }
  } catch (error) {
    console.log(error.message)
    return new Response(error.message, { status: 500 })
  }
}

