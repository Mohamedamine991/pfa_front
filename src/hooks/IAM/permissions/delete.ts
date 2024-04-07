import { toast } from "react-hot-toast"
import axios from "axios"

interface reqBody {
  idPermission: string
}
const useDeletePermission = () => {
  const Delete = async (target: string) => {
    const reqBody: reqBody = {
      idPermission: target,
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND}/iam/permissions`, reqBody, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        toast.success("Permission has been deleted")
      })
      .catch((e) => {
        toast.error(e.message)
      })
  }
  return { Delete }
}

export default useDeletePermission
