import { NextRequest, NextResponse } from "next/server"

import * as PoliciesHandlers from "@/lib/api/iam/gcp/policies"

export const GET = async (
  req: NextRequest,
  { params }: { params: { target: string } }
) => {
  const { target } = params

  if (!target) {
    return new NextResponse(
      JSON.stringify({ message: "policy name is required" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  }

  try {
    const res = await PoliciesHandlers.getPolicy(target)

    return new NextResponse(JSON.stringify(res), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return new NextResponse(
        JSON.stringify({ message: "policy is  not found" }),
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

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { target: string } }
) => {
  const { target } = params

  if (!target) {
    return new NextResponse(
      JSON.stringify({ message: "policy name is required" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  }

  try {
    const deletePolicy = await PoliciesHandlers.deletePolicy(target)
    return new NextResponse(JSON.stringify(deletePolicy), {
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
