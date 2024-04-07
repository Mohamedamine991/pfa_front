import { useState, useEffect } from "react"
import { toast } from "react-hot-toast"
import axios from "axios"
//get users, just send the request body
const useGetUser = () => {
  const [data, setData] = useState([])

  const GetAll = async () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND}/iam/users/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setData(res.data)
      })
      .catch((e) => {
        toast.error(e.message)
      })
  }
  const GetBy = async (target: number) => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND}/iam/users?id=${target}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setData(res.data)
      })
      .catch((e) => {
        toast.error(e.message)
      })
  }
  return { data, GetAll, GetBy }
}

export default useGetUser
