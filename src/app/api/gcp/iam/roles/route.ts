import * as RolesHandlers from "@/lib/api/iam/gcp/roles"

import { NextRequest, NextResponse } from "next/server"
import { CreateRoleBody, UpdateGroupBody } from "@/types/gcp-types"

export const GET = async (req: NextRequest) => {
  try {
    const res = await RolesHandlers.getRoles()
    console.log(res)
    return new NextResponse(JSON.stringify(res), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (e: any) {
    return e.response
  }
}

export const POST = async (req: NextRequest) => {
  try {
    const reqBody = await req.json()

    if (!reqBody.name) {
      return new NextResponse(
        JSON.stringify({ message: "Role's name is required" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    }
    const body: CreateRoleBody = {
      id: reqBody.string,
      name: reqBody.name,
      title: reqBody.title,
      description: reqBody.description,
      stage: reqBody.stage,
      permissions: reqBody.permissions,
    }

    try {
      const postRole = await RolesHandlers.createRole(body)
      return new NextResponse(JSON.stringify(postRole), {
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
    return e.response
  }
}
