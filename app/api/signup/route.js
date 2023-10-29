import prisma from "../../../prisma/client"
import bcrypt from 'bcrypt'

export async function POST(req, res) {
  const { name, email, password } = await req.json()
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: email }
    })

    if (existingUser) return new Response("Email already registered.", { status: 400 })

    const hashedPassword = await bcrypt.hash(password, 12)

    const result = await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: hashedPassword,
      },
    })

    const data = { ...result, id: await prisma.user.findUnique({ where: { email: email }}).id}

    return Response.json(data)
  } catch (error) {
    console.log(error)
    return new Response("Something went wrong.", { status: 500 })
  }
}