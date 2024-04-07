import Image from "next/image"
import svg from "./../../../public/cloud.svg"
import Link from 'next/link';

import { BiLinkExternal } from "react-icons/bi"
import { Button } from "@nextui-org/button"

import { Azure, AWS, GCP } from "./../molecules/icons"
const HeroSection = ({ ...props }) => {
  return (
    <main className="w-full  max-w-6xl m-auto h-auto   lg:h-[90vh] flex items-center justify-center flex-col-reverse lg:flex-row">
      <aside className="pl-6 w-full lg:w-2/3 gap-3 h-auto  lg:h-full flex justify-center flex-col  ">
        <h1 className="text-[#2B3E6C]  font-bold text-2xl lg:text-4xl quick w-10/12 lg:w-4/5">
          Single Powerful Platform to control multiple instances in Multiples Cloud Provider
        </h1>
        
        <div className="w-10/12 lg:w-4/5 h-auto">
      <Link href="/auth/register" legacyBehavior>
        <a className="text-[#2B3E6C] border-[#2B3E6C] px-10">
          <Button
            color="primary"
            variant="bordered"
            
          >
            Try It Out
            <BiLinkExternal />
          </Button>
        </a>
      </Link>
    </div>

        <div className="flex gap-5 w-10/12 lg:w-4/5 py-5 h-auto justify-start ">
          <Azure Width={50} />
          <GCP Width={58} />
          <AWS Width={90} />
        </div>
      </aside>

      <aside className=" w-full lg:w-1/3 h-auto  lg:h-full flex items-center justify-center lg:relative">
        <div className="lg:w-96 m-auto lg:h-96 w-72 h-72  lg:absolute  right-0  flex items-center  flex-col">
          {/*@ts-ignore */}
          <Image
            src={svg.src}
            objectFit="fill"
            width={400}
            height={400}
            alt={"SVG IMAGE"}
          />
        </div>
      </aside>
    </main>
  )
}

export default HeroSection
