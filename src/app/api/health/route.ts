import axios from "axios"
import { NextRequest, NextResponse } from "next/server"

const handler = async (req: NextRequest) => {
  try {
    const res: any = await axios.get(`${process.env.BACKEND}/health`)
    return NextResponse.json(res.data)
  } catch (e) {
    return NextResponse.json({ error: e })
  }
}

export { handler as GET }
