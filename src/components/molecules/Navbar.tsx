"use client"

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
import Link from "next/link"
import { Button } from "@nextui-org/button"
import Inariam from "./../../../public/inariam.svg"
import Image from "next/image"
const NavigationBar = ({ ...props }) => {
  const menuItems = [
    "Home",
    "Console",
    "Docs",
    "Tutorials",
    "Contact Us",
    "About Us",
    "Login",
  ]
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="nnv">
      <Navbar
        isBordered
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarContent>

        <NavbarContent className="sm:hidden pr-3" justify="center">
          <NavbarBrand className="gap-3 ">
            <div className="w-10 h-10  flex items-center justify-center  relative">
             
            </div>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarBrand className="gap-3 ">
            <div className="w-10 h-10  flex items-center justify-center  relative">
             
            </div>
          </NavbarBrand>
          <NavbarItem isActive>
            <Link color="foreground" href="/" aria-current="page">
              Home{" "}
            </Link>
          </NavbarItem>
         
          <NavbarItem>
            <Link color="foreground" href="#">
              Docs{" "}
            </Link>
          </NavbarItem>
         
          <NavbarItem>
            <Link color="foreground" href="#">
              About Us{" "}
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="/auth/login"> Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="warning" href="/auth/register" variant="flat">
              Request An Account
            </Button>
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full"
                color={
                  index === 2
                    ? "warning"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                href="#"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </div>
  )
}

export default NavigationBar
