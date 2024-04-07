import { NextRequest, NextResponse } from "next/server"

import * as awsHandlers from "@/lib/api/iam/aws/policies"
import * as gcpHandlers from "@/lib/api/iam/gcp/policies"

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
    searchFilters = ["PolicyName"]
  }

  let awsPolicies: any = await awsHandlers.getPolicies()
  let gcpPolicies: any = await gcpHandlers.getPolicies()

  gcpPolicies = gcpPolicies.bindings

  if (keyword) {
    awsPolicies = awsPolicies.filter((ele: any) => {
      let found = false
      searchFilters.forEach((filter: any) => {
        if (
          ele[filter] &&
          ele[filter].includes &&
          ele[filter].toLowerCase().includes(keyword)
        ) {
          found = true
        }
      })
      return found
    })

    gcpPolicies = gcpPolicies.filter((ele: any) => {
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

  awsPolicies.map((ele: any, index: number) => {
    ele.provider = "aws"
  })

  gcpPolicies.map((ele: any, index: number) => {
    ele.provider = "gcp"
  })

  gcpPolicies.map((gcp: any, index: number) => {
    gcp.PolicyName = gcp?.role
  })

  let data: any = []

  if (provider?.toLowerCase() === "aws" || !provider) {
    data = data.concat(awsPolicies)
  }
  if (provider?.toLowerCase() === "gcp" || !provider) {
    data = data.concat(gcpPolicies)
  }

  data.sort((a: any, b: any) => {
    if (a.PolicyName < b.PolicyName) {
      return -1
    }
    if (a.PolicyName > b.PolicyName) {
      return 1
    }
    return 0
  })

  return NextResponse.json(data)
}
