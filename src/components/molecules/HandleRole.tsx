import React from "react"
import { Chip } from "@nextui-org/chip"
import { Input, Textarea } from "@nextui-org/input"

import { Select, SelectItem } from "@nextui-org/select"
const HandleRole = ({ ...props }) => {
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
      <Input type="text" label="Role Name" value={props.Name} />

      <Select
        items={providers}
        label="Cloud Provider"
        placeholder="Select a cloud provider"
        className="max-w-full"
        value={"azure"}
      >
        {(provider) => (
          <SelectItem key={provider.value}>{provider.label}</SelectItem>
        )}
      </Select>

      <Select
        items={permissions}
        label="Assign Permissions"
        variant="bordered"
        isMultiline={true}
        selectionMode="multiple"
        placeholder="Select Permissions"
        labelPlacement="outside"
        classNames={{
          base: "max-w-full",
          trigger: "min-h-unit-12 py-2",
        }}
        renderValue={renderValue}
      >
        {(permission) => (
          <SelectItem key={permission.id} textValue={permission.name}>
            ({permission.id}) {permission.name}
          </SelectItem>
        )}
      </Select>

      <Textarea
        value={props.Description}
        placeholder="Description of the Role"
      ></Textarea>
    </div>
  )
}

export default HandleRole
