"use client"

import React, { useState } from "react"
import { Chip } from "@nextui-org/chip"
import { Input } from "@nextui-org/input"
import { Button } from "@nextui-org/button"
import { Select, SelectItem } from "@nextui-org/select"
import useCreateGroup from "@/hooks/IAM/groups/create"
const HandleGroup = ({ ...props }) => {
  const { createGroup, provider, setProvider, name, setName } = useCreateGroup()

  const [sub, setSub]: any = useState(false)
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

  const permissions = [
    { name: "Read", id: 1 },
    { name: "Write", id: 2 },
    { name: "Delete", id: 3 },
  ]

  const renderValue = (items: any) => {
    return (
      <div className="flex flex-wrap gap-2">
        {items.map((item: any) => (
          <Chip key={item.id}>{item.name}</Chip>
        ))}
      </div>
    )
  }

  return (
    <div className="w-2/3 flex items-center justify-center flex-col h-auto m-auto gap-5">
      <form
        className="w-full flex items-center justify-center flex-col h-auto m-auto gap-5"
        onSubmit={async (e: any) => {
          setSub(true)
          if (props.Type === "w") {
            e.preventDefault()
            await createGroup().then((r) => {
              props.onCreate("Created The Group" + r)
            })
          }
          if (props.Type === "a") {
            e.preventDefault()
            await createGroup()
          }
        }}
      >
        <Input
          type="text"
          label="Group Name"
          value={name}
          //onchange
          onChange={(e) => {
            if (props.Type === "w") {
              setName(e.target.value)
            }
            if (props.Type === "a") {
              setName(e.target.value)
            }
          }}
        />

        {props.Type === "w" && (
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
        )}
        <Button color="warning" className="text-white" type="submit">
          Submit {sub && <span className="smallLoader"></span>}
        </Button>
        <br />
      </form>
    </div>
  )
}

export default HandleGroup
