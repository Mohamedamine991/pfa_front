import { NextRequest, NextResponse } from "next/server"

import { getServiceAccounts } from "@/lib/api/iam/gcp/serviceAccounts"

export const GET = async (req: NextRequest) => {
  let keyword = req.nextUrl.searchParams.get("q")

  let searchFilters: any = req.nextUrl.searchParams.get("filters")

  if (searchFilters) {
    searchFilters = searchFilters
      .substring(1, searchFilters.length - 1)
      .split(",")
      .map((filter: string) => filter.substring(1, filter.length - 1).trim())
  } else {
    searchFilters = ["username", "arn"]
  }

  let ServiceAccounts: any = await getServiceAccounts()

  if (keyword) {
    ServiceAccounts = ServiceAccounts.filter((ele: any) => {
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

  let data: any = ServiceAccounts

  return NextResponse.json(data)
}
