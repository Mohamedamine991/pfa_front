import { useState } from "react"
import { signIn } from "next-auth/react"
import { Login } from "@/types/loginTypes"
const useLogin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const login = async () => {
    const body: Login = {
      email,
      password,
    }

    await signIn("credentials", {
      email,
      password,
    })
  }

  return { email, password, setEmail, setPassword, login }
}

export default useLogin
