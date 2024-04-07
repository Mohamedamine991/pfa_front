import { useState, useEffect } from "react"
import { toast } from "react-hot-toast"
import axios from "axios"

interface reqBody {
  idRole: string
}
const useDeleteRole = () => {
  const Delete = async (target: string) => {
    const reqBody: reqBody = {
      idRole: target,
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND}/iam/role`, reqBody, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        toast.success("Role has been deleted")
      })
      .catch((e) => {
        toast.error(e.message)
      })
  }
  return { Delete }
}

export default useDeleteRole
