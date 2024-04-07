"use client"
import React, { useState, useEffect } from "react"
import { Title, ProviderButton } from "@/components/atoms"
import { RoleData, IamModal } from "@/components/organisms"
import { AdminMenu, HandleRole } from "@/components/molecules"
import { AiOutlineSearch } from "react-icons/ai"
import { Input } from "@nextui-org/input"
import { Button } from "@nextui-org/button"
import { Checkbox } from "@nextui-org/checkbox"
import { useDisclosure } from "@nextui-org/use-disclosure"
import { useDebounce } from "@uidotdev/usehooks"
import inariam from "./../../../public/inariam2.svg"
import { Toaster, toast } from "react-hot-toast"
import Image from "next/image"

const getRoles = async (search: String, provider: String) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND}/api/iam/roles?q=${search}&provider=${provider}`
  )
  return res.json()
}

const RolePage = () => {
  const [roles, setRoles]: any = useState()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [search, setSearch] = useState("")
  const [prov, setProv] = useState("")
  const searchDebounce = useDebounce(search, 500)
  const handleOpen = () => {
    onOpen()
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRoles(search, prov)
      setRoles(data)
    }
    fetchData()
  }, [searchDebounce, prov])

  return (
    <div className="w-full h-screen overflow-hidden">
      <section className="w-full h-auto  darkGradient overflow-hidden">
        <AdminMenu Counter={300} />
      </section>

      <div className="flex items-center justify-center w-full h-full">
        <aside
          className="hidden xl:block w-1/4 h-full border-r border-gray-600"
          style={{
            background:
              "radial-gradient(circle at 18.7% 37.8%, rgb(250, 250, 250) 0%, rgb(225, 234, 238) 90%)",
          }}
        >
          <Title>My Cloud Providers</Title>

          <div className="w-full h-auto flex items-center justify-center flex-col gap-5">
            <ProviderButton
              Active
              Provider="aws"
              Event={() => {
                if (!prov) {
                  setProv("aws")
                  toast.success("Enabled Showing only AWS Data")
                } else {
                  if (prov === "aws") {
                    setProv("")
                    toast.success("Disabled Showing only AWS Data")
                  } else {
                    setProv("aws")
                    toast.success("Enabled Showing only AWS Data")
                  }
                }
              }}
            />
            <ProviderButton
              Active
              Provider="azure"
              Event={() => {
                if (!prov) {
                  setProv("azure")
                  toast.success("Enabled Showing only AZURE Data")
                } else {
                  if (prov === "azure") {
                    setProv("")
                    toast.success("Disabled Showing only AZURE Data")
                  } else {
                    setProv("azure")
                    toast.success("Enabled Showing only AZURE Data")
                  }
                }
              }}
            />
            <ProviderButton
              Active
              Provider="gcp"
              Event={() => {
                if (!prov) {
                  setProv("gcp")
                  toast.success("Enabled Showing only GCP Data")
                } else {
                  if (prov === "gcp") {
                    setProv("")
                    toast.success("Disabled Showing only GCP Data")
                  } else {
                    setProv("gcp")
                    toast.success("Enabled Showing only GCP Data")
                  }
                }
              }}
            />
            <ProviderButton Provider="aws" />
          </div>
        </aside>
        <aside className="w-full xl:w-3/4 h-full overflow-y-scroll pb-20 ">
          <Title>List Of Roles ({roles ? roles.length : 0})</Title>

          <div className="w-4/5 m-auto h-auto flex items-center justify-between px-10 flex-col md:flex-row gap-5">
            <Input
              type="text"
              color="default"
              className="lg:w-96 !text-xs lg:text-base"
              placeholder="Search For A Role"
              labelPlacement="outside"
              startContent={
                <AiOutlineSearch className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
              }}
            />

            <Button
              color="warning"
              className="text-white"
              type="button"
              onPress={() => {
                handleOpen()
              }}
            >
              Add A Role
            </Button>
          </div>
          <div className="w-4/5 m-auto px-10 pt-10 flex gap-5 flex-col md:flex-row">
            <p className="text-gray-900 font-semibold">
              Search Filter Option :{" "}
            </p>
            <div className="flex gap-10">
              <Checkbox
                defaultSelected
                color="default"
                icon={
                  <Image
                    src={inariam}
                    fill
                    alt={""}
                    className="!p-5 block relative"
                  />
                }
                onChange={(e) => {}}
              >
                Name
              </Checkbox>
            </div>
          </div>
          <div className="w-11/12 lg:w-4/5 m-auto h-auto px-10 py-10">
            {roles && <RoleData Data={roles} />}
          </div>
          {!roles && (
            <div className="m-auto w-full flex items-center justify-center">
              <span className="loader"></span>
            </div>
          )}
        </aside>
      </div>

      <IamModal
        Size={"4xl"}
        isOpen={isOpen}
        onClose={onClose}
        handler={handleOpen}
        body={<HandleRole />}
        title={"Create IAM Role"}
      />

      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  )
}

export default RolePage
