import { useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"

const useCreateUsers = () => {
  const [provider, setProvider] = useState("")
  const [username, setUsername] = useState("")
  const createUser = async () => {
    try {
      if (!provider || !username) {
        throw new Error("Provider and username are required.")
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/${provider}/iam/users`,
        {
          username: username,
        }
      )

      if (response.status === 200) {
        toast.success("User created successfully")
      } else {
        toast.error("Error creating the User")
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

  return { provider, username, setProvider, setUsername, createUser }
}

export default useCreateUsers
