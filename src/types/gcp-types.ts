interface CreateServiceAccount {
  display_name: string
  name: string
  description: string
}

interface CreateGroupBody {
  name: string
  description: string
}

interface UpdateGroupBody {
  description: string
}

interface CreateRoleBody {
  id: string
  name: string
  title: string
  description: string
  stage: string
  permissions: string[]
}

interface UpdateRoleBody {
  name: string
  title: string
  description: string
  stage: string
  permissions: string[]
}

interface CreatePolicyBody {
  policy: {
    bindings: {
      role: string
      members: string[]
    }[]
    etags: string
    version: number
  }
}
interface UpdatePolicyBody {}
export {}
export type {
  CreateServiceAccount,
  CreateGroupBody,
  UpdateGroupBody,
  CreateRoleBody,
  UpdateRoleBody,
  CreatePolicyBody,
}
