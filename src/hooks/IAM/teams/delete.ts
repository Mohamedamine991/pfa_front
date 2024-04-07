import { useState, useEffect } from "react"
import { toast } from "react-hot-toast"
import axios from "axios"

interface reqBody {
  idTeam: string
}
const useDeleteTeam = () => {
  const Delete = async (target: string) => {
    const reqBody: reqBody = {
      idTeam: target,
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND}/iam/team`, reqBody, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        toast.success("Team has been deleted")
      })
      .catch((e) => {
        toast.error(e.message)
      })
  }
  return { Delete }
}

export default useDeleteTeam
