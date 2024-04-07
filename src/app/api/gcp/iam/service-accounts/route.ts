import * as ServiceAccounts from "@/lib/api/iam/gcp/serviceAccounts"
import { NextRequest, NextResponse } from "next/server"
import { CreateServiceAccount } from "@/types/gcp-types"
export const GET = async (req: NextRequest) => {
  try {
    const data: any = await ServiceAccounts.getServiceAccounts()
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

    if (!reqBody.name || !reqBody.display_name || !reqBody.description) {
      return new NextResponse(
        JSON.stringify({ message: "please provide the necessary fields" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    }
    const body: CreateServiceAccount = {
      display_name: reqBody.display_name,
      name: reqBody.name,
      description: reqBody.description,
    }

    try {
      const postServiceAccount = await ServiceAccounts.createServiceAccount(
        body
      )
      return new NextResponse(JSON.stringify(postServiceAccount), {
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
