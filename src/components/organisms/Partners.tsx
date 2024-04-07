import Pcp from "./../../../public/pcp.png"
import Image from "next/image"
import { Title } from "./../atoms"
const Partners = ({ ...props }) => {
  return (
    <section className="max-w-6xl m-auto w-full h-auto py-10">
      <Title>Our Partners</Title>

      <div className="w-full h-auto flex items-center justify-center flex-wrap gap-10">
        <div className="w-44 h-44 relative">
          {/*@ts-ignore */}
          <Image src={Pcp.src} fill alt={"Pcp Consulting Partner's Logo"} />
        </div>
        <div className="w-44 h-44 relative">
          {/*@ts-ignore */}
          <Image src={Pcp.src} fill alt={"Pcp Consulting Partner's Logo"} />
        </div>
        <div className="w-44 h-44 relative">
          {/*@ts-ignore */}
          <Image src={Pcp.src} fill alt={"Pcp Consulting Partner's Logo"} />
        </div>
        <div className="w-44 h-44 relative">
          {/*@ts-ignore */}
          <Image src={Pcp.src} fill alt={"Pcp Consulting Partner's Logo"} />
        </div>
      </div>
    </section>
  )
}

export default Partners
