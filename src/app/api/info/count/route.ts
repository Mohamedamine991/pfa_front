import { NextResponse } from "next/server"
import { getUsers } from "@/lib/api/iam/aws/users"
import { getGroups } from "@/lib/api/iam/aws/groups"
import { getPolicies } from "@/lib/api/iam/aws/policies"
import { getRoles } from "@/lib/api/iam/aws/roles"
import { CountData } from "@/types/iamTypes"
import { getServiceAccounts } from "@/lib/api/iam/gcp/serviceAccounts"
export const GET = async () => {
  let data: CountData = {
    users: 0,
    groups: 0,
    roles: 0,
    policies: 0,
    serviceAccounts: 0,
  }

  let users: any = await getUsers()
  let groups: any = await getGroups()
  let policies: any = await getPolicies()
  let roles: any = await getRoles()
  let serviceAccounts: any = await getServiceAccounts()
  data.users = users.length
  data.groups = groups.length
  data.roles = roles.length
  data.policies = policies.length
  data.serviceAccounts = serviceAccounts.length

  return NextResponse.json(data)
}
