import axios from "axios"
import { toast } from "react-hot-toast"
const useDeleteUser = () => {
  const Delete = async (target: string, provider: string) => {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/${provider}/iam/users/${target}`
    )

    if (response.status === 200) {
      toast.success("User deleted successfully")
    } else {
      toast.error("Error deleting the User")
    }
  }

  return {
    Delete,
  }
}

export default useDeleteUser
