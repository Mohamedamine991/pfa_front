enum providers {
  aws = "aws",
  azure = "azure",
  gcp = "gcp",
}

interface CreateUserBody {
  username: string
}

interface UpdateUserBody {
  username: string
  new_username: string
}

interface CreateGroupBody {
  name: string
}

interface UpdateGroupBody {
  new_name: string
}

interface CreateRoleBody {
  name: string
  trust_policy: any
}

interface UpdateRoleBody {
  name: string
  new_name: string
  trust_policy: any
}

interface CreatePolicyBody {
  policy_name: string
  policy_document: any
}
interface UpdatePolicyBody {
  arn: string
  policy_documents: any
}

interface CountData {
  users: number
  groups: number
  roles: number
  policies: number
  serviceAccounts: number
}

export { providers }

export type {
  CreateUserBody,
  UpdateUserBody,
  CreateGroupBody,
  UpdateGroupBody,
  CreateRoleBody,
  UpdateRoleBody,
  CreatePolicyBody,
  UpdatePolicyBody,
  CountData,
}
