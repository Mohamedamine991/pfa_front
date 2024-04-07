import React from "react"
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table"

import { Tooltip } from "@nextui-org/tooltip"

import { AiOutlineEye, AiTwotoneEdit } from "react-icons/ai"
import { RiDeleteBin5Fill } from "react-icons/ri"

const statusColorMap: any = {
  active: "success",
  paused: "danger",
  vacation: "warning",
}

import { AWS, Azure, GCP } from "../molecules/icons"
const columns = [
  { name: "NAME", uid: "name" },
  { name: "Provider", uid: "provider" },
  { name: "ACTIONS", uid: "actions" },
  { name: "CREATED AT", uid: "createdAt" },
]

let roles = [
  {
    id: "1",
    name: "Administrator",
    description: "Full administrative access",
    createdAt: "2023-11-13",
    provider: "AWS",
  },
  {
    id: "2",
    name: "Developer",
    description: "Access to development resources",
    createdAt: "2023-11-14",
    provider: "GCP",
  },
  {
    id: "3",
    name: "Analyst",
    description: "Access for data analysis",
    createdAt: "2023-11-15",
    provider: "Azure",
  },
  {
    id: "4",
    name: "Manager",
    description: "Managerial access level",
    createdAt: "2023-11-16",
    provider: "AWS",
  },
  {
    id: "5",
    name: "Support",
    description: "Access for providing support",
    createdAt: "2023-11-17",
    provider: "GCP",
  },
  {
    id: "6",
    name: "Security Officer",
    description: "Access for security management",
    createdAt: "2023-11-18",
    provider: "Azure",
  },
  {
    id: "7",
    name: "Tester",
    description: "Access for testing purposes",
    createdAt: "2023-11-19",
    provider: "AWS",
  },
  {
    id: "8",
    name: "Data Scientist",
    description: "Access for data science tasks",
    createdAt: "2023-11-20",
    provider: "GCP",
  },
  {
    id: "9",
    name: "Operations",
    description: "Access for operational tasks",
    createdAt: "2023-11-21",
    provider: "Azure",
  },
  {
    id: "10",
    name: "Auditor",
    description: "Access for auditing purposes",
    createdAt: "2023-11-22",
    provider: "AWS",
  },
  {
    id: "11",
    name: "Researcher",
    description: "Access for research tasks",
    createdAt: "2023-11-23",
    provider: "GCP",
  },
  {
    id: "12",
    name: "Trainer",
    description: "Access for training and education",
    createdAt: "2023-11-24",
    provider: "Azure",
  },
  {
    id: "13",
    name: "Compliance Officer",
    description: "Access for compliance management",
    createdAt: "2023-11-25",
    provider: "AWS",
  },
  {
    id: "14",
    name: "Designer",
    description: "Access for design purposes",
    createdAt: "2023-11-26",
    provider: "GCP",
  },
  {
    id: "15",
    name: "Coordinator",
    description: "Access for coordinating tasks",
    createdAt: "2023-11-27",
    provider: "Azure",
  },
]

const RolesTable = ({ ...props }) => {
  roles.map((ele, ind) => {
    ele.provider = ele.provider.toUpperCase()
  })
  const renderCell = React.useCallback((item: any, columnKey: any) => {
    const cellValue = item[columnKey]

    switch (columnKey) {
      case "name":
        return (
          <p className="flex gap-5">
            {
              //display the provider logo :
              item.provider === "AWS" ? (
                <AWS Width={20} />
              ) : item.provider === "AZURE" ? (
                <Azure Width={20} />
              ) : item.provider === "GCP" ? (
                <GCP Width={20} />
              ) : null
            }
            {item[columnKey]}
          </p>
        )
      case "actions":
        return (
          <div className="relative  flex items-center gap-2 max-h-1/2">
            <Tooltip content="Details ">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <AiOutlineEye />
              </span>
            </Tooltip>
            <Tooltip content="Edit Permission">
              <button onClick={props.onEdit}>
                <span className="text-lg text-default-400 curso r-pointer active:opacity-50">
                  <AiTwotoneEdit />
                </span>
              </button>
            </Tooltip>
            <Tooltip color="danger" content="Delete Permission">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <RiDeleteBin5Fill />
              </span>
            </Tooltip>
          </div>
        )
      default:
        return cellValue
    }
  }, [])

  return (
    <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={roles}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell key={columnKey}>
                {renderCell(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default RolesTable
