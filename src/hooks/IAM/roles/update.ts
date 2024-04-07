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
  permissions: string[]
  provider: typeof prov
  target: number
}
const useUpdateRole = () => {
  const [name, setName] = useState("")
  const [description, setDescr] = useState("")
  const [permissions, setPermissions] = useState([])
  const [provider, setProvider] = useState(prov)
  const Update = async (target: number) => {
    const reqBody: reqBody = {
      name,
      description,
      permissions,
      provider,
      target,
    }

    axios
      .patch(`${process.env.NEXT_PUBLIC_BACKEND}/iam/roles`, reqBody, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        toast.success("Role has been Updated")
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
    permissions,
    setPermissions,
    provider,
    setProvider,
    Update,
  }
}

export default useUpdateRole
