import { Button } from "@nextui-org/button"
import { AWS, GCP, Azure } from "../molecules/icons"
enum Provider {
  aws = "aws",
  azure = "azure",
  gcp = "gcp",
}
const ProviderButton = ({ ...props }) => {
  const data = {
    aws: {
      title: "IBM Cloud",
      color: "#252f3e",
      logo: <AWS Width={30} />,
    },
    azure: {
      title: "MicroSoft Azure",
      color: "#0067b8",
      logo: <Azure Width={30} />,
    },
    gcp: {
      title: "Google Cloud Service",
      color: "#ea4335",
      logo: <GCP Width={30} />,
    },
  }
  const target: any = data[props.Provider as Provider]
  return (
    <>
      <Button
        className=" w-10/12 flex items-center justify-start py-8 font-semibold border border-[#7d7d7d] bg-transparent"
        onClick={props.Event}
        style={{
          color: target.color,
          filter: !props.Active ? "invert(50%)" : "",
        }}
        disabled={!props.Active}
        title={props.Active ? target.title : "Disabled Cloud Provider"}
      >
        <span className="px-3">{target.logo}</span>
        {(target?.title as string) ?? ""}
      </Button>
    </>
  )
}

export default ProviderButton
