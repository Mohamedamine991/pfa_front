import { NextRequest, NextResponse } from "next/server"
import * as awsHandlers from "@/lib/api/iam/aws/groups"

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
    searchFilters = ["name", "arn", "date"]
  }

  let awsGroups: any = await awsHandlers.getGroups()

  if (keyword) {
    awsGroups = awsGroups.filter((ele: any) => {
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

  awsGroups = awsGroups.map((ele: any) => {
    ele.provider = "aws"
    return ele
  })
  let data: any = []

  if (provider?.toLowerCase() === "aws" || !provider) {
    data = data.concat(awsGroups)
  }

  return NextResponse.json(data)
}
