import { useState, useEffect } from "react"
import { toast } from "react-hot-toast"
import { UpdateGroupBody } from "@/types/iamTypes"
import axios from "axios"
const useUpdateGroup = () => {
  const [newName, setNewName] = useState("")

  const Update = async (target: string, provider: string) => {
    const reqBody: UpdateGroupBody = {
      new_name: newName,
    }
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND}/${provider}/iam/groups/${target}/`,
      reqBody
    )

    if (response.status === 200) {
      toast.success("Done Updating The Group")
    } else {
      toast.error("Error Updating The Group")
    }
  }

  return { newName, setNewName, Update }
}

export default useUpdateGroup
