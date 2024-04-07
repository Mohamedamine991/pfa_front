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

import { AWS, GCP, Azure } from "@/components/molecules/icons"

const columns = [
  { name: "NAME", uid: "PolicyName" },
  { name: "ACTIONS", uid: "actions" },
]

const PolicyData = ({ Data }: { Data: any[] }) => {
  console.log("The data from component is : ", Data)
  const renderCell = React.useCallback((item: any, columnKey: any) => {
    const cellValue = item[columnKey] || null
    switch (columnKey) {
      case "PolicyName":
        return (
          <Tooltip content={item[columnKey]}>
            <span className="text-default-900 flex  gap-3 align-center">
              {item["provider"] === "aws" ? (
                <AWS Width={25} />
              ) : item["provider"] === "gcp" ? (
                <GCP Width={25} />
              ) : (
                <Azure Width={25} />
              )}
              {String(item[columnKey]).length > 20
                ? item[columnKey].slice(0, 20) + "..."
                : item[columnKey]}
            </span>
          </Tooltip>
        )
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
      <TableBody>
        {Data.map((item: any) => (
          <TableRow key={item.PolicyId}>
            {columns.map((column) => (
              <TableCell key={column.uid}>
                {renderCell(item, column.uid)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default PolicyData
