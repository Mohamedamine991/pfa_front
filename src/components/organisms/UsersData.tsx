import React from "react"
import useDeleteUser from "@/hooks/IAM/users/delete"
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
import { AWS, GCP, Azure } from "../molecules/icons"
const columns = [
  { name: "NAME", uid: "username" },
  { name: "ARN", uid: "arn" },
  { name: "ACTIONS", uid: "actions" },
]

const UsersData = ({ Data, onDelete }: { Data: any; onDelete: any }) => {
  const { Delete } = useDeleteUser()

  const handleDelete = async (username: string, provider: string) => {
    await Delete(username, "aws").then((r) => {
      onDelete(`Deleted User ${username}`)
    })
  }

  const renderCell = React.useCallback((item: any, columnKey: any) => {
    const cellValue = item[columnKey] || null
    switch (columnKey) {
      case "username":
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
        return item[columnKey] || ""
      case "actions":
        return (
          <div className="relative w-full flex items-center gap-2 max-h-1/2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <AiOutlineEye />
              </span>
            </Tooltip>
            <Tooltip content="Edit Permission">
              <button>
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <AiTwotoneEdit />
                </span>
              </button>
            </Tooltip>
            <Tooltip color="danger" content="Delete Permission">
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => handleDelete(item.username, item.provider)}
              >
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

export default UsersData
