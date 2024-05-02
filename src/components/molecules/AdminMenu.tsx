"use client"
import Link from "next/link"
import { useState } from "react"
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar"
import { Input } from "@nextui-org/input"
import Image from "next/image"
import Inariam from "./../../../public/inariam2.svg"
import { FiSearch } from "react-icons/fi"
import { TfiDashboard } from "react-icons/tfi"
import { MdOutlinePolicy } from "react-icons/md"
import { NotificationBell } from "."
import { RiFunctionLine } from "react-icons/ri"

import { AiOutlineGroup, AiOutlineUserSwitch } from "react-icons/ai"
import { DropUser } from "../organisms"

const AdminMenu = ({ ...props }) => {
  const menuItems = [
    {
      label: "Dashboard",
      target: "/dashboard",
    },
    {
      label: "Manage Policies",
      target: "/policies",
    },
    {
      label: "Manage Roles",
      target: "/roles",
    },
    {
      label: "Manage Groups",
      target: "/groups",
    },

    {
      label: "Manage Users",
      target: "/users",
    },
  ]
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="w-full h-auto nv">
      <Navbar
        isBordered
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="text-white"
          />
        </NavbarContent>

        <NavbarContent className="sm:hidden" justify="center">
          <NavbarBrand className="gap-3 ">
            <Link href={"/dashboard"}>
              <div className="w-10 h-10  flex items-center justify-center  relative">
                <Image src={Inariam} alt={"Inariam Logo"} fill />
              </div>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4 " justify="center">
          
          <NavbarItem isActive>
            <Link
              color="foreground"
              href="/dashboard"
              aria-current="page"
              className="text-white text-xs flex items-center justify-center gap-2"
            >
              <TfiDashboard style={{ color: "#ffffff", fontSize: "1.5rem" }} />
              Home
            </Link>
          </NavbarItem>

          <NavbarItem>
            <Link
              color="foreground"
              href="/policies"
              className="text-white text-xs quick flex items-center justify-center gap-2"
            >
              <MdOutlinePolicy
                style={{ color: "#ffffff", fontSize: "1.5rem" }}
              />
              Manage Ressources
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              color="foreground"
              href="/roles"
              className="text-white text-xs quick flex items-center justify-center gap-2"
            >
              <RiFunctionLine
                style={{ color: "#ffffff", fontSize: "1.5rem" }}
              />
              Manage Roles
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              color="foreground"
              href="/groups"
              className="text-white text-xs flex items-center justify-center gap-2"
            >
              <AiOutlineGroup
                style={{ color: "#ffffff", fontSize: "1.5rem" }}
              />
              Manage Groups
            </Link>
          </NavbarItem>

          <NavbarItem>
            <Link
              color="foreground"
              href="/users"
              className="text-white text-xs flex items-center justify-center gap-2"
            >
              <AiOutlineUserSwitch
                style={{ color: "#ffffff", fontSize: "1.5rem" }}
              />
              Manage Users
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem>
            <Input
              classNames={{
                base: "max-w-full sm:max-w-[15rem] h-10 hidden lg:block",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper:
                  "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
              }}
              placeholder="Type to search..."
              size="sm"
              startContent={<FiSearch size={18} />}
              type="search"
            />
          </NavbarItem>
          <NavbarItem>
            <NotificationBell Counter={props.Counter} />
          </NavbarItem>
          <NavbarItem>
            <div className="cursor-pointer h-full flex items-center justify-center">
              <DropUser />
            </div>
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu className="!bg-none">
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link className="w-full" href={item.target}>
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </div>
  )
}

export default AdminMenu
