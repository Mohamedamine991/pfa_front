import axios from "axios"

import { NextRequest, NextResponse } from "next/server"
import { Login } from "@/types/loginTypes"

const handler = async (req: NextRequest) => {
  let body
  try {
    body = await req.json()
  } catch (e) {
    return NextResponse.json({ error: "Invalid JSON" })
  }

  const { email, password } = body as Login
  if (!email || !password) {
    return NextResponse.json({ error: "Invalid email or password" })
  }

  try {
    const makeLoggin = await axios.post(
      `http://${process.env.BACKEND}/auth/login`,
      {
        email: email,
        password: password,
      } as Login
    )

    return NextResponse.json(makeLoggin.data)
  } catch (e) {
    return NextResponse.json({ error: e })
  }
}

export { handler as POST }
