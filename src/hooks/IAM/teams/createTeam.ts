import { useState, useEffect } from "react"
import { toast } from "react-hot-toast"
import axios from "axios"
enum prov {
  aws = "aws",
  azure = "azure",
  google = "google",
}
interface reqBody {
  name: string
  description: string
  roles: string[]
  permissions: string[]
  provider: typeof prov
  users: string[]
  teams: string[]
}

const useCreateTeam = () => {
  const [name, setName] = useState("")
  const [description, setDescr] = useState("")
  const [roles, setRoles] = useState([])
  const [permissions, setPermissions] = useState([])
  const [provider, setProvider] = useState(prov)
  const [users, setUsers] = useState([])
  const [teams, setTeams] = useState([])
  const Create = async () => {
    const reqBody: reqBody = {
      name,
      description,
      roles,
      permissions,
      provider,
      users,
      teams,
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND}/iam/teams`, reqBody, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        toast.success("Group has been created")
      })
      .catch((e) => {
        toast.error(e.message)
      })
  }
  return {
    name,
    setName,
    description,
    setDescr,
    roles,
    setRoles,
    permissions,
    setPermissions,
    provider,
    setProvider,
    Create,
    users,

    setUsers,
    teams,
    setTeams,
  }
}

export default useCreateTeam
