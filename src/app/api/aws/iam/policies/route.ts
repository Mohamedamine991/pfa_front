import { NextRequest, NextResponse } from "next/server"
import { CreatePolicyBody } from "@/types/iamTypes"
import { getPolicies, createPolicy } from "@/lib/api/iam/aws/policies"

export const GET = async (req: NextRequest) => {
  try {
    const res = await getPolicies()
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
      return new NextResponse(JSON.stringify({ message: "name is required" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      })
    }
    const body: CreatePolicyBody = {
      policy_name: reqBody.name,
      policy_document: null,
    }

    try {
      const postPolicy = await createPolicy(body)
      return new NextResponse(JSON.stringify(postPolicy), {
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
