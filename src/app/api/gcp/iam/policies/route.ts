import { NextRequest, NextResponse } from "next/server"
import { CreateRoleBody } from "@/types/iamTypes"
import * as PoliciesHandler from "@/lib/api/iam/gcp/policies"

export const GET = async (req: NextRequest) => {
  try {
    const res = await PoliciesHandler.getPolicies()
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
