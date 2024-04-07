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
  provider: typeof prov
  policies: string[]
}
const useCreatePermission = () => {
  const [name, setName] = useState("")
  const [description, setDescr] = useState("")
  const [policies, setPol] = useState([])
  const [provider, setProvider] = useState(prov)
  const Create = async () => {
    const reqBody: reqBody = {
      name,
      description,
      policies,
      provider,
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND}/iam/permissions`, reqBody, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        toast.success("Permission Has Been created")
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
    policies,
    setPol,
    provider,
    setProvider,
    Create,
  }
}

export default useCreatePermission
