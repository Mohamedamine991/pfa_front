import { NextRequest, NextResponse } from "next/server"

import { getUsers } from "@/lib/api/iam/aws/users"

export const GET = async (req: NextRequest) => {
  let keyword = req.nextUrl.searchParams.get("q")

  let searchFilters: any = req.nextUrl.searchParams.get("filters")

  let provider: any = req.nextUrl.searchParams.get("provider")

  if (searchFilters) {
    searchFilters = searchFilters
      .substring(1, searchFilters.length - 1)
      .split(",")
      .map((filter: string) => filter.substring(1, filter.length - 1).trim())
  } else {
    searchFilters = ["username", "arn"]
  }

  let awsUsers: any = await getUsers()

  if (keyword) {
    awsUsers = awsUsers.filter((ele: any) => {
      let found = false
      searchFilters.forEach((filter: any) => {
        if (
          ele[filter] &&
          ele[filter].includes &&
          ele[filter].includes(keyword)
        ) {
          found = true
        }
      })
      return found
    })
  }

  awsUsers.map((ele: any, index: number) => {
    ele.provider = "aws"
  })

  let data: any = []

  if (provider?.toLowerCase() === "aws" || !provider) {
    data = data.concat(awsUsers)
  }

  return NextResponse.json(data)
}
