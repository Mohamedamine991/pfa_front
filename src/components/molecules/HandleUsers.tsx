"use client"
import React, { useState } from "react"
import { Select, SelectItem } from "@nextui-org/select"
import { Input } from "@nextui-org/input"
import { Button } from "@nextui-org/button"
import useCreateUser from "@/hooks/IAM/users/create"

const HandeUsers = ({ ...props }) => {
  const [sub, setSub]: any = useState(false)

  const { createUser, provider, setProvider, username, setUsername } =
    useCreateUser()
  const providers = [
    {
      label: "Amazon Web Service",
      value: "aws",
      description: "Amazon Web Service Provider",
    },
    {
      label: "MicroSoft Azure",
      value: "azure",
      description: "MicroSoft Azure Provider",
    },
    {
      label: "Google Cloud Platform",
      value: "gcp",
      description: "Google Cloud Platform Provider",
    },
  ]

  return (
    <div className="w-2/3 flex items-center justify-center flex-col h-auto m-auto gap-5">
      <form
        onSubmit={async (e) => {
          setSub(true)
          e.preventDefault()
          await createUser().then((r) => {
            props.onCreate("Created The Group" + r)
          })
        }}
        className="w-full flex items-center justify-center flex-col h-auto m-auto gap-5"
      >
        <Input
          type="text"
          label={"Username"}
          value={username}
          onChange={(e) => {
            setUsername(e.target.value)
          }}
        />

        <Select
          items={providers}
          label="Cloud Provider"
          placeholder="Select a cloud provider"
          className="max-w-full"
          value={provider}
          onChange={(e) => {
            setProvider(e.target.value)
          }}
        >
          {(provider) => (
            <SelectItem key={provider.value}>{provider.label}</SelectItem>
          )}
        </Select>

        <Button color="warning" className="text-white" type="submit">
          Submit {sub && <span className="smallLoader"></span>}
        </Button>

        <br />
      </form>
    </div>
  )
}

export default HandeUsers
