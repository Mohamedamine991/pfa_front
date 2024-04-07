import { NextRequest, NextResponse } from "next/server"
import { UpdateGroupBody } from "@/types/iamTypes"

import { getGroup, deleteGroup, updateGroup } from "@/lib/api/iam/aws/groups"

export const GET = async (
  req: NextRequest,
  { params }: { params: { name: string } }
) => {
  const { name } = params

  if (!name) {
    return new NextResponse(JSON.stringify({ message: "name is required" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  try {
    const data = await getGroup(name)

    return new NextResponse(JSON.stringify(data), {
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
  { params }: { params: { name: string } }
) => {
  const { name } = params

  if (!name || name.trim() === "") {
    return new NextResponse(
      JSON.stringify({ message: "Group name is required." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    )
  }

  const reqBody = await req.json()

  if (!reqBody.new_name || reqBody.new_name.trim() === "") {
    return new NextResponse(
      JSON.stringify({ message: "New name is required." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    )
  }

  const group: UpdateGroupBody = {
    new_name: reqBody.new_name,
  }

  try {
    const data = await updateGroup(group, name)
    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (e: any) {
    return new NextResponse(JSON.stringify({ message: e.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { name: string } }
) => {
  const { name } = params

  if (!name) {
    return new NextResponse(JSON.stringify({ message: "name is required" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  try {
    const deleteResponse = await deleteGroup(name)

    if (deleteResponse) {
      return new NextResponse(JSON.stringify(deleteResponse), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      })
    } else {
      return new NextResponse(JSON.stringify({ message: "Group not found" }), {
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
