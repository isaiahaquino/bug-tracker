import prisma from "../../../../prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(req, { params }) {
  const id = params.id
  try {
    const session = await getServerSession(authOptions)
    if (!session) return new Response("Unauthorized", { status: 401 })
    
    const project = await prisma.project.findUnique({
      where: { id }
    })

    const todo = await prisma.bug.findMany({ where: { AND: [{ project: { id: id } }, { progress: "To Do" }] }, include: { author: { select: { name: true }}, comments: { select: { id: true }} } })
    const inProg = await prisma.bug.findMany({ where: { AND: [{ project: { id: id } }, { progress: "In Progress" }] }, include: { author: { select: { name: true }}, comments: { select: { id: true }} } })
    const inRev = await prisma.bug.findMany({ where: { AND: [{ project: { id: id } }, { progress: "In Review" }] }, include: { author: { select: { name: true }}, comments: { select: { id: true }} } })
    const done = await prisma.bug.findMany({ where: { AND: [{ project: { id: id } }, { progress: "Done" }] }, include: { author: { select: { name: true }}, comments: { select: { id: true }} } })

    return Response.json({ project, todo, inProg, inRev, done })
  } catch (error) {
    return new Response(error.error, { status: 500 })
  }
}

export async function POST(req, { params }) {
  try {
    const id = params.id
    const { title, desc, category, progress, severity, author } = await req.json()
    const session = await getServerSession(authOptions)
    if (!session) return new Response("Unauthorized", { status: 401 })

    // if (!(progress === "T" || progress === "P" || progress === "R" || progress === "D")) return new Response({ status: 400 })
    if (Number(severity) < 1 || Number(severity) > 3 ) return new Response({ status: 400 })

    console.log("testasdf")

    const postBug = await prisma.bug.create({
      data: {
        title,
        desc,
        category,
        progress,
        severity: Number(severity),
        author: { 
          connect: { id: author }
        },
        project: {
          connect: { id: id }
        },
      }
    })

    console.log(postBug)

    return Response.json(postBug)
  } catch (error) {
    return new Response(error.message, { status: 500 })
  }
}