import { NextRequest, NextResponse } from "next/server"

import * as awsHandler from "@/lib/api/iam/aws/roles"
import * as gcpHandler from "@/lib/api/iam/gcp/roles"

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
    searchFilters = ["name"]
  }

  let awsRoles: any = await awsHandler.getRoles()
  let gcpRoles: any = await gcpHandler.getRoles()

  awsRoles.map((role: any) => {
    role.provider = "aws"
    role.name = role.role_name
    delete role.role_name
  })
  gcpRoles.map((role: any) => {
    role.provider = "gcp"
  })

  if (keyword) {
    awsRoles = awsRoles.filter((ele: any) => {
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

    gcpRoles = gcpRoles.filter((ele: any) => {
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

  let data: any = []
  if (provider?.toLowerCase() === "aws" || !provider) {
    data = data.concat(awsRoles)
  }
  if (provider?.toLowerCase() === "gcp" || !provider) {
    data = data.concat(gcpRoles)
  }

  return NextResponse.json(data)
}
