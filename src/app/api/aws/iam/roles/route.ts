import { NextRequest, NextResponse } from "next/server"
import { CreateRoleBody } from "@/types/iamTypes"
import { getRole, getRoles, createRole } from "@/lib/api/iam/aws/roles"

export const GET = async (req: NextRequest) => {
  try {
    const res = await getRoles()
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
        JSON.stringify({ message: "role name is required" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    }
    const body: CreateRoleBody = {
      name: reqBody.name,
      trust_policy: null,
    }

    try {
      const postRole = await createRole(body)
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
