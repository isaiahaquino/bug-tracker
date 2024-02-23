import prisma from "../../../prisma/client";

export async function GET(req, res) {
  try {
    // dashbaord preview
    if (req.nextUrl.searchParams.get("prev")) {
      switch (req.nextUrl.searchParams.get("prev")) {
        case "todo":
          const todoResult = await prisma.bug.findMany({
            where: {
              progress: "To Do"
            },
            include: {
              project: {
                select: { title: true }
              }
            },
            orderBy: { createdAt: "desc" }
          })

          return Response.json(todoResult)
        case "inProg":
          const inProgResult = await prisma.bug.findMany({
            where: {
              progress: "In Progress"
            },
            include: {
              project: {
                select: { title: true }
              }
            },
            orderBy: { createdAt: "desc" }
          })
          return Response.json(inProgResult)
      }
    }

    // Get total

    // use primsa.bug.count() to get the count
    
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

