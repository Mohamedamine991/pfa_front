"use client"
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
import useDeleteGroup from "@/hooks/IAM/groups/delete"
const columns = [
  { name: "NAME", uid: "name" },
  { name: "ARN", uid: "arn" },
  { name: "CREATED AT", uid: "created_date" },
  { name: "ACTIONS", uid: "actions" },
]
import { GCP, AWS, Azure } from "../molecules/icons"
const GroupData = ({ Data, onDelete }: { Data: any; onDelete: any }) => {
  const { Delete } = useDeleteGroup()

  const handleDelete = async (groupName: string, provider: string) => {
    await Delete(groupName, provider).then((r) => {
      onDelete(`Deleted Group ${groupName}`)
    })
  }

  const handleUpdate = async (
    target: string,
    new_name: string,
    provider: string
  ) => {
    alert(`attempt to update group ${target}`)
  }

  const renderCell = React.useCallback((item: any, columnKey: any) => {
    switch (columnKey) {
      case "name":
        return (
          <Tooltip content={item[columnKey]}>
            <span className="text-default-900 flex  gap-3 align-center">
              {item["provider"].toLowerCase() == "aws" ? (
                <AWS Width={25} />
              ) : item["provider"].toLowerCase() == "gcp" ? (
                <GCP Width={25} />
              ) : (
                <Azure Width={25} />
              )}
              {item[columnKey].length > 20
                ? item[columnKey].slice(0, 20) + "..."
                : item[columnKey]}
            </span>
          </Tooltip>
        )
      case "arn":
        return item[columnKey].length > 20 ? (
          <Tooltip content={item[columnKey]}>
            <span className="text-default-900">
              {item[columnKey].slice(0, 20)}...
            </span>
          </Tooltip>
        ) : (
          item[columnKey] || ""
        )
      case "actions":
        return (
          <div className="relative w-full flex items-center gap-2 max-h-1/2">
            {/* Existing tooltips... */}
            <Tooltip color="danger" content="Delete Group">
              <button
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => {
                  handleDelete(item["name"], item["provider"])
                }}
              >
                <RiDeleteBin5Fill />
              </button>
            </Tooltip>

            <Tooltip color="default" content="View Group">
              <button className="text-lg text-default-500 cursor-pointer active:opacity-50">
                <AiOutlineEye />
              </button>
            </Tooltip>

            <Tooltip color="default" content="Update Group">
              <button
                className="text-lg text-default-500 cursor-pointer active:opacity-50"
                onClick={() => {
                  handleUpdate(item["name"], "", item["provider"])
                }}
              >
                <AiTwotoneEdit />
              </button>
            </Tooltip>
          </div>
        )
      default:
        return item[columnKey].length > 20 ? (
          <Tooltip content={item[columnKey]}>
            <span className="text-default-900">
              {item[columnKey].slice(0, 20)}...
            </span>
          </Tooltip>
        ) : (
          item[columnKey] || ""
        )
    }
  }, [])

  return (
    Data && (
      <Table aria-label="Inariam Table">
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
        <TableBody items={Data}>
          {(item: any) => (
            <TableRow key={item?.id}>
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
  )
}

export default GroupData
