"use client"

import { Title } from "@/components/atoms"

import Pcp from "./../../../../public/pcp.png"
import Envlp from "./../../../../public/envlp.svg"
import Image from "next/image"
import { Input, Button } from "@nextui-org/react"
import Link from "next/link"
import Inariam from "./../../../../public/inariam2.svg"
import { Verif } from "@/hooks"

const Verify = () => {
  const { code, setCode } = Verif()

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full h-full flex items-center justify-between flex-col">
        <div className="w-full h-auto px-5 flex items-center justify-between">
          <div className="w-16 h-16 relative">
            {/*@ts-ignore */}
            <Image src={Inariam} fill alt={"Inariam LOGO"} />
          </div>
          <div className="md:w-32 md:h-32 w-24 h-24 relative">
            {/*@ts-ignore */}
            <Image src={Pcp} fill alt={"PCP LOGO"} />
          </div>
        </div>

        <section className="w-full h-auto flex flex-col items-center justify-center pb-10 ">
          <div className="relative md:w-48  md:h-48 w-28 h-28">
            {/*@ts-ignore */}
            <Image src={Envlp.src} fill alt={"Email Logo"} />
          </div>
          <Title>Email Confirmation</Title>

          <p className=" text-xs md:text-base w-10/12 md:w-2/3 text-[#003077] text-center quick">
            We Have Sent An Email To
            <span className="font-bold text-[#CC4419] underline ">
              mm@mm.com
            </span>{" "}
            to confirm the validity of our email address. After receiving the
            email follow the link provided to complete th registration, or paste
            thereceived code
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault()
            }}
            action="POST"
            className="py-5 w-2/3 flex items-center justify-center gap-5 flex-col md:flex-row"
          >
            <Input
              type="number"
              label={"Enter The Received Code"}
              className="md:w-1/3 w-full quick"
              value={code}
              onChange={(e) => {
                setCode(e.target.value)
              }}
            />
            <Button
              color="primary"
              className="h-full py-4 font-bold px-10 quick bg-[#3D5898] w-full md:w-auto"
              type="submit"
            >
              Verify
            </Button>
          </form>
          <Link
            href={""}
            className="text-[#3D5898] md:text-base py-5 text-sm quick underline"
          >
            You Didin&apos;t Receive The Code ?
          </Link>
        </section>
        <div></div>
        <div className="w-full h-auto flex items-center justify-center py-5">
          <p className="text-sm quick text-[#9BA4B8]">
            &copy;2023 Inariam by PCP | All Right Reserved
          </p>
        </div>
      </div>
    </div>
  )
}

export default Verify
