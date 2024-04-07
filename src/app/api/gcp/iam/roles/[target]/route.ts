import { NextRequest, NextResponse } from "next/server"
import * as RolesHandlers from "@/lib/api/iam/gcp/roles"
import { UpdateRoleBody } from "@/types/gcp-types"

export const GET = async (
  req: NextRequest,
  { params }: { params: { target: string } }
) => {
  const { target } = params

  if (!target) {
    return new NextResponse(
      JSON.stringify({ message: "Role's target  is required" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  }

  try {
    const res = await RolesHandlers.getRole(target)

    return new NextResponse(JSON.stringify(res), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return new NextResponse(
        JSON.stringify({ message: "Role is not found" }),
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
  { params }: { params: { target: string } }
) => {
  const { target } = params

  if (!target) {
    return new NextResponse(
      JSON.stringify({ message: "Role's target is required" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  }
  const reqBody = await req.json()
  if (
    !reqBody.name ||
    !reqBody.title ||
    !reqBody.description ||
    !reqBody.stage ||
    !reqBody.permissions
  ) {
    return new NextResponse(
      JSON.stringify({ message: "Please provide the necessary fields" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  }

  const role: UpdateRoleBody = {
    name: reqBody.name,
    title: reqBody.title,
    description: reqBody.description,
    stage: reqBody.stage,
    permissions: reqBody.permissions,
  }
  try {
    const updateRole = await RolesHandlers.updateRole(role, target)
    return new NextResponse(JSON.stringify(updateRole), {
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

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { target: string } }
) => {
  const { target } = params

  if (!target) {
    return new NextResponse(
      JSON.stringify({ message: "Role's target is required" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  }

  try {
    const deleteRole = await RolesHandlers.deleteRole(target)
    return new NextResponse(JSON.stringify(deleteRole), {
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
