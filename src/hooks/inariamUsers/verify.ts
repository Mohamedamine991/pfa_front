import { useState } from "react"
const Verif = () => {
  const [code, setCode] = useState("")
  const VerifyCode = async () => {
    try {
      const target: string = process.env.NEXT_PUBLIC_BACKEND || ""
    } catch (err) {}
  }
  return { code, setCode, VerifyCode }
}

export default Verif
