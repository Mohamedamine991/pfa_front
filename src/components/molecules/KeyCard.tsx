import Image from "next/image"
const KeyCard = ({ ...props }) => {
  return (
    <>
      <div className="w-10/12 sm:w-1/2  md:w-1/4 h-96 flex items-center justify-center flex-col">
        <div className="w-36 h-36  relative">
          {/*@ts-ignore */}
          <Image src={props.Image} fill alt={props.Title ?? "SVG LOGO "} />
        </div>
        <div className="w-full h-12 my-5 font-bold text-[#2B3E6C] flex items-center justify-center">
          <h2 className="text-center w-4/5 text-sm lg:text-base">
            {props.Title}
          </h2>
        </div>
        <p className="text-center text-xs lg:text-sm">{props.Description}</p>
      </div>
    </>
  )
}

export default KeyCard
