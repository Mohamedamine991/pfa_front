import { NextRequest, NextResponse } from "next/server"
import { CreateGroupBody } from "@/types/iamTypes"

import { createGroup, getGroups } from "@/lib/api/iam/gcp/groups"
export const GET = async (req: NextRequest) => {
  try {
    const data = await getGroups()
    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (e: any) {
    return new NextResponse(JSON.stringify({ message: e.message }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}

export const POST = async (req: NextRequest) => {
  try {
    const reqBody = await req.json()

    if (!reqBody.name) {
      return new NextResponse(
        JSON.stringify({ message: "Group name is required" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    }
    const body: CreateGroupBody = {
      name: reqBody.username,
    }

    try {
      const postGroup = await createGroup(body)
      return new NextResponse(JSON.stringify(postGroup), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      })
    } catch (e: any) {
      return new NextResponse(JSON.stringify({ message: e.message }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      })
    }
  } catch (e: any) {
    return new NextResponse(JSON.stringify({ message: e.message }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}
