import { useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"
const useDeleteGroup = () => {
  const Delete = async (target: string, provider: string) => {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/${provider}/iam/groups/${target}`
    )

    if (response.status === 200) {
      toast.success("Group deleted successfully")
    } else {
      toast.error("Error deleting the Group")
    }
  }

  return {
    Delete,
  }
}

export default useDeleteGroup
