import { useState } from "react"
import axios from "axios"

import { toast } from "react-hot-toast"
const useUpdateUser = () => {
  const [new_name, set_new_Name] = useState("")

  const Update = async (provider: string) => {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/${provider}/iam/users`,
      {
        new_name: name,
      }
    )

    if (response.status === 200) {
      toast.success("User updated successfully")
    } else {
      toast.error("Error updating the user")
    }
  }
  return { Update, new_name, set_new_Name }
}

export default useUpdateUser
