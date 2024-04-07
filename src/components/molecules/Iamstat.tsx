import { Button } from "@nextui-org/button"
import { BsArrowRight } from "react-icons/bs"
import Link from "next/link"
const Iamstats = ({ ...props }) => {
  return (
    <div className="w-full sm:w-56 h-24  quick  rounded  border flex border-white  sm:px-5 justify-center ">
      <div className="h-full flex items-center justify-center w-1/12 sm:w-1/5  ">
        {props.Icon}
      </div>
      <div className="w-3/5 px-4 h-full  flex justify-center flex-col">
        <h2 className="text-white text-2xl font-bold">{props.Sum}</h2>
        <p className="text-white text-sm">{props.Title}</p>
      </div>
      <div className="w-1/5 h-full flex items-center justify-center">
        {props.To ? (
          <Link href={props.To}>
            <Button
              isIconOnly
              color="warning"
              aria-label="Take a photo"
              className="rounded-full !w-10 !h-10"
            >
              <BsArrowRight style={{ color: "#ffffff", fontSize: "1rem" }} />
            </Button>
          </Link>
        ) : (
          <Button
            isIconOnly
            color="warning"
            aria-label="Take a photo"
            className="rounded-full !w-10 !h-10"
            disabled
          >
            <BsArrowRight style={{ color: "#ffffff", fontSize: "1rem" }} />
          </Button>
        )}
      </div>
    </div>
  )
}

export default Iamstats
