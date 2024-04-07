import { Input, Textarea } from "@nextui-org/input"

import { Select, SelectItem } from "@nextui-org/select"
import { Button } from "@nextui-org/button"

const HandlePermission = ({ ...props }) => {
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
      <Input type="text" label="Permission Name" value={props.Name} />

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

      <Textarea
        value={props.Description}
        placeholder="Description of the permission"
      ></Textarea>

      <Button color="danger" className="w-full ">
        {props.Type === "w" && <>Select The Policies</>}
        {props.Type === "a" && <>Edit The Policies The Permissions</>}
      </Button>
    </div>
  )
}

export default HandlePermission
