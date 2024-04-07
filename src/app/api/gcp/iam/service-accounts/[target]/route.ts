import { NextRequest, NextResponse } from "next/server"
import * as ServiceAccounts from "@/lib/api/iam/gcp/serviceAccounts"

export const GET = async (
  req: NextRequest,
  { params }: { params: { target: string } }
) => {
  const { target } = params

  if (!target) {
    return new NextResponse(
      JSON.stringify({ message: "Please provide the Target Service Account" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  }

  try {
    const res = await ServiceAccounts.getServiceAccount(target)

    return new NextResponse(JSON.stringify(res.data), {
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

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { target: string } }
) => {
  const { target } = params

  if (!target) {
    return new NextResponse(
      JSON.stringify({
        message: "Please Provide the Target you wants to delete",
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  }

  try {
    const deleteResponse = await ServiceAccounts.deleteServiceAccount(target)

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
