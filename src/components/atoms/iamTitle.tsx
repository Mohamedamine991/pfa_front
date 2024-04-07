"use client"
import { useState, useEffect } from "react"
import { Title } from "./"

const getStats = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/info/count`)
  return res.json()
}
const IamTitle = async ({ ...props }) => {
  const stats: any = await getStats()
  return (
    <>
      <Title>
        List Of
        {props.Type.toLowerCase() === "sa" ? "Service Accounts" : props.Type} (
        {
          stats[
            props.Type.toLowerCase() === "sa"
              ? "service-accounts"
              : props.Type.toLowerCase()
          ]
        }
        )
      </Title>
    </>
  )
  //get the name only
}

export default IamTitle
