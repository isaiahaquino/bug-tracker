import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req, res) {
  const session = await getServerSession(authOptions)  
  
  if (!session) {
    return new Response("No session", {status: 400})
  }

  return new Response("okay", {status: 200})
}