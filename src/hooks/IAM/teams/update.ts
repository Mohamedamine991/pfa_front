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
  target: number
}

const useUdateTeam = () => {
  const [name, setName] = useState("")
  const [description, setDescr] = useState("")
  const [roles, setRoles] = useState([])
  const [permissions, setPermissions] = useState([])
  const [provider, setProvider] = useState(prov)
  const [users, setUsers] = useState([])
  const [teams, setTeams] = useState([])
  const Update = async (target: number) => {
    const reqBody: reqBody = {
      name,
      description,
      roles,
      permissions,
      provider,
      users,
      teams,
      target,
    }

    axios
      .patch(`${process.env.NEXT_PUBLIC_BACKEND}/iam/teams`, reqBody, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        toast.success("Team has been created")
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
    Update,
    users,

    setUsers,
    teams,
    setTeams,
  }
}

export default useUdateTeam
