import { NextRequest, NextResponse } from "next/server"
import {
  getPolicy,
  deletePolicy,
  updatePolicy,
} from "@/lib/api/iam/aws/policies"
import { UpdatePolicyBody } from "@/types/iamTypes"

export const GET = async (
  req: NextRequest,
  { params }: { params: { name: string } }
) => {
  const { name } = params

  if (!name) {
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
    const res = await getPolicy(name)

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

export const PUT = async (
  req: NextRequest,
  { params }: { params: { name: string } }
) => {
  const { name } = params

  if (!name) {
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
  const reqBody = await req.json()
  if (!reqBody.name || !reqBody.new_name) {
    return new NextResponse(
      JSON.stringify({ message: "name and new_name are required" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  }

  const pol: UpdatePolicyBody = {
    arn: reqBody.arn,
    policy_documents: reqBody.new_username,
  }
  try {
    await updatePolicy(pol, name).then((r) => {
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
    await deletePolicy(name).then((r: any) => {
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
