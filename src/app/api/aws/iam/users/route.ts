import { NextRequest, NextResponse } from "next/server"
import { CreateUserBody } from "@/types/iamTypes"
import { getUsers, createUser, deleteUser } from "@/lib/api/iam/aws/users"

export const GET = async (req: NextRequest) => {
  try {
    const res = await getUsers()

    return new NextResponse(JSON.stringify(res), {
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

    if (!reqBody.username) {
      return new NextResponse(
        JSON.stringify({ message: "username is required" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    }
    const body: CreateUserBody = {
      username: reqBody.username,
    }

    try {
      const postUser = await createUser(body)
      return new NextResponse(JSON.stringify(postUser), {
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
