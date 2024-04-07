import { Azure, AWS, GCP } from "./icons"
import { BiTimeFive } from "react-icons/bi"

enum typeCloud {
  aws = "aws",
  azure = "azure",
  gcp = "gcp",
}
const CloudProvider = ({ ...props }) => {
  const types: { aws: string; azure: string; gcp: string } = {
    aws: "Amazon Web Service",
    azure: "Microsoft Azure",
    gcp: "Google Cloud Platform",
  }
  const name: string = types[props.Type.toLowerCase() as typeCloud]
  return (
    <div className="w-10/12 h-auto flex items-center  relative gap-3 border border-[#959595] p-5 rounded">
      {props.Type.toLowerCase() === "aws" && (
        <>
          <AWS Width={30} />
        </>
      )}

      {props.Type.toLowerCase() === "azure" && (
        <>
          <Azure Width={30} />
        </>
      )}

      {props.Type.toLowerCase() === "gcp" && (
        <>
          <GCP Width={30} />
        </>
      )}
      <p className="text-sm text-[#2B3E6C]">
        {name} (
        <b
          className={`text-red-600`}
          style={{
            color: props.isConnected ? "#28a16c" : "#c20e53",
          }}
        >
          {props.isConnected ? "Connected" : "Disconnected"}
        </b>
        )
      </p>

      <p className="hidden md:flex  items-center justify-center absolute right-5 gap-2 text-xs">
        Created At : {props.Date as string}
        <BiTimeFive style={{ color: "#2B3E6C", fontSize: "1rem" }} />
      </p>
    </div>
  )
}
export default CloudProvider
