import { useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"

const useCreateGroup = () => {
  const [provider, setProvider] = useState("")
  const [name, setName] = useState("")

  const createGroup = async () => {
    try {
      if (!provider || !name) {
        throw new Error("Provider and name are required.")
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/${provider}/iam/groups`,
        {
          name: name,
        }
      )

      if (response.status === 200) {
        toast.success("Group created successfully")
      } else {
        toast.error("Error creating the group")
      }
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message)
      } else if (error.message) {
        toast.error(error.message)
      } else {
        toast.error("Error creating the group")
      }
    }
  }

  return { provider, name, setProvider, setName, createGroup }
}

export default useCreateGroup
