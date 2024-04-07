import { NextRequest, NextResponse } from "next/server"
import { getUser, updateUser, deleteUser } from "@/lib/api/iam/aws/users"
import axios from "axios"
import { UpdateUserBody } from "@/types/iamTypes"

export const GET = async (
  req: NextRequest,
  { params }: { params: { username: string } }
) => {
  const { username } = params

  if (!username) {
    return new NextResponse(
      JSON.stringify({ message: "Username is required" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  }

  try {
    const res = await getUser(username)
    return new NextResponse(JSON.stringify(res), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      })
    } else {
      return new NextResponse(
        JSON.stringify({ message: "An error occurred" }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    }
  }
}

export const PUT = async (
  req: NextRequest,
  { params }: { params: { username: string } }
) => {
  const { username } = params

  if (!username) {
    return new NextResponse(
      JSON.stringify({ message: "Username is required" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  }
  const reqBody = await req.json()
  if (!reqBody.username || !reqBody.new_username) {
    return new NextResponse(
      JSON.stringify({ message: "username and new_username are required" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  }

  const user: UpdateUserBody = {
    username: reqBody.username,
    new_username: reqBody.new_username,
  }
  try {
    await updateUser(user, username).then((r) => {
      return new NextResponse(JSON.stringify(r.data), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      })
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

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { username: string } }
) => {
  const { username } = params

  if (!username) {
    return new NextResponse(
      JSON.stringify({ message: "Username is required" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  }

  try {
    const deleteResponse = await deleteUser(username)

    if (deleteResponse) {
      return new NextResponse(JSON.stringify(deleteResponse), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      })
    } else {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      })
    }
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({ message: error.message || "An error occurred" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  }
}
