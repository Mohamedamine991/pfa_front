import { NextRequest, NextResponse } from "next/server"
import {
  getRoles,
  updateRole,
  getRole,
  deleteRole,
} from "@/lib/api/iam/aws/roles"
import axios from "axios"
import { UpdateRoleBody } from "@/types/iamTypes"

export const GET = async (
  req: NextRequest,
  { params }: { params: { name: string } }
) => {
  const { name } = params

  if (!name) {
    return new NextResponse(
      JSON.stringify({ message: "role name  is required" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  }

  try {
    const res = await getRole(name)

    return new NextResponse(JSON.stringify(res), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return new NextResponse(
        JSON.stringify({ message: "role is not found" }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
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

  if (!name) {
    return new NextResponse(
      JSON.stringify({ message: "Role name is required" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  }
  const reqBody = await req.json()
  if (!reqBody.new_username) {
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

  const role: UpdateRoleBody = {
    name: name,
    new_name: reqBody.new_name,
    trust_policy: null,
  }
  try {
    await updateRole(role, name).then((r) => {
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
  { params }: { params: { name: string } }
) => {
  const { name } = params

  if (!name) {
    return new NextResponse(
      JSON.stringify({ message: "Role Name is required" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  }

  try {
    await deleteRole(name).then((r) => {
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
