import {
  AdminMenu,
  SimpleUserContainer,
  Iamstats,
  CloudProvider,
} from "@/components/molecules"
import { Button } from "@nextui-org/button"
import {
  AiOutlineGroup,
  AiOutlineTeam,
  AiOutlineUserSwitch,
} from "react-icons/ai"
import Link from "next/link"
import { MdOutlinePolicy } from "react-icons/md"
import { AiOutlineControl } from "react-icons/ai"

import { BiEditAlt } from "react-icons/bi"

const getTickets = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/info/count`)

  return res.json()
}

const Dashboard: React.FC = async () => {
  const ticket = await getTickets()
  return (
    <div className="w-full min-h-screen h-auto">
      <section className="w-full md:h-96  h-auto  pb-10 darkGradient overflow-hidden">
        <AdminMenu Counter={300} />

        <div className="w-full max-w-[1300px]  m-auto py-10  h-full  flex items-center justify-center flex-col lg:flex-row px-10 lg:px-3 gap-10 lg:gap-0">
          <aside className="lg:w-1/3 w-full h-auto  lg:h-full  flex justify-center gap-5 flex-col">
            <h1 className="text-3xl quick text-white">Welcome Back ! </h1>
            <SimpleUserContainer />

            <Button
              color="default"
              variant="bordered"
              href="/profile"
              as={Link}
              className="w-48 text-white"
            >
              Edit Your Profile
              <BiEditAlt style={{ color: "#ffffff", fontSize: "1.2rem" }} />
            </Button>
          </aside>
          <aside className="lg:w-2/3 w-full h-auto   flex items-center  flex-wrap gap-x-5 gap-5 ">
            <Iamstats
              Title={"Policies"}
              Sum={ticket ? ticket.policies : 0}
              Icon={
                <MdOutlinePolicy
                  style={{ color: "#ffffff", fontSize: "15rem" }}
                />
              }
              To={"/permissions"}
            />
            <Iamstats
              Title={"Roles"}
              Sum={ticket ? ticket.roles : 0}
              Icon={
                <AiOutlineControl
                  style={{ color: "#ffffff", fontSize: "15rem" }}
                />
              }
              To={"/roles"}
            />
            <Iamstats
              Title={"Users"}
              Sum={ticket ? ticket.users : 0}
              Icon={
                <AiOutlineUserSwitch
                  style={{ color: "#ffffff", fontSize: "15rem" }}
                />
              }
              To={"/users"}
            />
            <Iamstats
              Title={"Groups"}
              Sum={ticket ? ticket.groups : 0}
              Icon={
                <AiOutlineGroup
                  style={{ color: "#ffffff", fontSize: "15rem" }}
                />
              }
              To={"/groups"}
            />
            <Iamstats
              Title={"Service Accounts"}
              Sum={ticket ? ticket.serviceAccounts : 0}
              Icon={
                <AiOutlineTeam
                  style={{ color: "#ffffff", fontSize: "15rem" }}
                />
              }
              To={"/teams"}
            />
          </aside>
        </div>
      </section>

      <section className="w-full h-auto flex items-center justify-center max-w-[1300px] py-10 m-auto flex-col">
        <h2 className="text-xl font-bold pb-7">My Providers</h2>
        <div className="w-full m-auto items-center justify-center gap-3 h-auto flex flex-col ">
          <CloudProvider Type={"aws"} isConnected Date={"23/12/2023"} />
          <CloudProvider Type={"azure"} Date={"23/12/2023"} />
          <CloudProvider Type={"gcp"} isConnected Date={"23/12/2023"} />
        </div>
      </section>
    </div>
  )
}

export default Dashboard
