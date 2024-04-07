"use client"
import React, { useState, useEffect } from "react"

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

import { AWS, Azure, GCP } from "../molecules/icons"
const columns = [{ name: "NAME", uid: "username" }]

const DataTable = ({ ...props }) => {
  const [perms, setPerms] = useState([])

  useEffect(() => {
    if (props.Permissions) {
      setPerms(props.Permissions)
      console.log("changed ! ", props.Permissions)
    }
  }, [props])

  const renderCell = React.useCallback((item: any, columnKey: any) => {
    const cellValue = item[columnKey] || null

    switch (columnKey) {
      case "name":
        return (
          <p className="flex gap-5">
            {item?.provider.toUpperCase() === "AWS" ? (
              <AWS Width={20} />
            ) : item?.provider.toUpperCase() === "AZURE" ? (
              <Azure Width={20} />
            ) : item?.provider.toUpperCase() === "GCP" ? (
              <GCP Width={20} />
            ) : null}
            {item[columnKey] || ""}
          </p>
        )
      case "actions":
        return (
          <div className="relative w-full  flex items-center gap-2 max-h-1/2">
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
    perms && (
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
        <TableBody items={perms}>
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

export default DataTable
