"use client"
import React, { useState, useEffect } from "react"
import { Title, ProviderButton } from "@/components/atoms"
import { PolicyData, IamModal } from "@/components/organisms"
import { AdminMenu, HandlePolicy } from "@/components/molecules"
import { AiOutlineSearch } from "react-icons/ai"
import { Input } from "@nextui-org/input"
import { Button } from "@nextui-org/button"
import { Checkbox } from "@nextui-org/checkbox"
import { useDisclosure } from "@nextui-org/use-disclosure"
import inariam from "./../../../public/inariam2.svg"
import Image from "next/image"
import { useDebounce } from "@uidotdev/usehooks"
const getPolicies = async (provider: string, search: string, flt: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND}/api/iam/policies?q=${search}&provider=${provider}&filters=${flt}`
  )
  return res.json()
}
const PolicyPage = () => {
  const [iamPolicies, setPolicies]: any = useState()
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce(search, 500)
  const [prov, setProv] = useState("")
  const [filters, setFilters]: any = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [saveRes, setSaveRes]: any = useState()
  const [deleteRes, setDeleteRes]: any = useState()
  const handleOpen = () => {
    onOpen()
  }

  useEffect(() => {
    const fetchData = async () => {
      const data: any = await getPolicies(
        prov,
        debouncedSearch,
        String(filters)
      )
      setPolicies(data)
    }
    fetchData()
    onClose()
  }, [debouncedSearch, filters, prov, saveRes, deleteRes])

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
            <ProviderButton Active Provider="aws" Event={() => {}} />
            {/* <ProviderButton Active Provider="azure" Event={() => {}} /> */}
            <ProviderButton Active Provider="gcp" Event={() => {}} />
            <ProviderButton Provider="aws" />
          </div>
        </aside>
        <aside className="w-full xl:w-3/4 h-full overflow-y-scroll pb-20 ">
          <Title>
            List Of Policies ({iamPolicies ? iamPolicies.length : 0})
          </Title>

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
              Add A Policy
            </Button>
          </div>
          <div className="w-4/5 m-auto px-10 pt-10 flex gap-5 flex-col md:flex-row">
            <p className="text-gray-900 font-semibold">
              Search Filter Option :
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
                onChange={(e: any) => {
                  if (e.checked) {
                    setFilters([...filters, "namee"])
                  } else {
                    setFilters(filters.filter((f: any) => f !== "name"))
                  }
                }}
              >
                Policy Name
              </Checkbox>
            </div>
          </div>
          <div className="w-11/12 lg:w-4/5 m-auto h-auto px-10 py-10">
            {iamPolicies && <PolicyData Data={iamPolicies} />}
          </div>
          {!iamPolicies && (
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
        body={
          <HandlePolicy
            onCreate={(r: any) => {
              setSaveRes(r)
            }}
          />
        }
        title={"Create IAM Policy"}
      />
    </div>
  )
}

export default PolicyPage
