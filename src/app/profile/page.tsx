import { AdminMenu, SimpleUserContainer } from "@/components/molecules"
import { FiUser } from "react-icons/fi"
import { Button } from "@nextui-org/button"
import { MdOutlinePrivacyTip } from "react-icons/md"
import { CiLogout } from "react-icons/ci"

import { PiPassword } from "react-icons/pi"
import { CiSettings } from "react-icons/ci"
import { TbReportSearch } from "react-icons/tb"

import Link from "next/link"
import { Input } from "@nextui-org/input"
const Profile = () => {
  return (
    <div className="w-full h-auto min-h-screen">
      <section className="w-full h-auto  darkGradient overflow-hidden">
        <AdminMenu Counter={300} />
      </section>

      <div className="w-full h-[93vh] bg-gray-50 flex items-center justify-center">
        <aside className="w-3/12 h-full border-r-2 relative">
          <div className="w-2/3 m-auto p-10">
            <SimpleUserContainer w />
          </div>

          <div className="w-full h-auto flex items-center justify-center flex-col gap-5">
            <Link
              href={""}
              className="w-full h-auto p-3      border-[#c20e4d] flex items-center pl-10  gap-3 text-lg font-semiBold"
            >
              <FiUser className={"text-2xl"} />
              User Information
            </Link>
            <Link
              href={""}
              className="w-full h-auto p-3       flex items-center  gap-3 text-lg font-semiBold pl-10"
            >
              <PiPassword className={"text-2xl"} />
              Security Settings
            </Link>

            <Link
              href={""}
              className="w-full h-auto p-3       flex items-center gap-3 text-lg font-semiBold pl-10"
            >
              <CiSettings className={"text-2xl"} />
              General Settings
            </Link>

            <Link
              href={""}
              className="w-full h-auto p-3       flex items-center  gap-3 text-lg font-semiBold pl-10"
            >
              <TbReportSearch className={"text-2xl"} />
              View Reports
            </Link>

            <Link
              href={""}
              className="w-full h-auto p-3         flex items-center  gap-3 text-lg font-semiBold pl-10"
            >
              <MdOutlinePrivacyTip className={"text-2xl"} />
              Privacy And Policy
            </Link>
          </div>

          <div className="absolute bottom-5 w-full h-auto flex items-center justify-center">
            <Button color="danger" className="w-[50%]">
              <CiLogout className={"text-2xl"} color={"white"} />
              Logout
            </Button>
          </div>
        </aside>
        <aside className="w-9/12 h-full flex items-center justify-center">
          <div className="w-1/2 m-auto h-auto ">
            <h1 className="text-3xl pb-10 text-center font-bold mb-4 text-[#c20e4d]">
              Update User Information
            </h1>
            <p className="pb-10 text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
              harum repellendus perferendis sapiente.
            </p>
            <form className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Full Name"
                  value={"Khalil Amdouni"}
                  label={"Full Name"}
                />
                <Input
                  placeholder="Email"
                  value={"kamdouni@pcp-consulting.fr"}
                  label={"Email"}
                />
                <Input
                  placeholder="Website"
                  value={"kamdoumi.com"}
                  label={"Website"}
                />
                <Input
                  placeholder="Username"
                  label={"Username"}
                  value={"kamdouni"}
                />
              </div>
              <div className="w-1/3 h-auto m-auto  flex items-center justify-center pt-10">
                <Button color="primary" className="w-full py-6">
                  Update My Informations
                </Button>
              </div>
            </form>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default Profile
