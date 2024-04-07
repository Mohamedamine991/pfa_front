import { User } from "@nextui-org/user"

import { Link } from "@nextui-org/link"
const SimpleUserContainer = ({ ...props }) => {
  return (
    <div>
      <User
        name={
          <span
            style={{
              color: props.w ? "#333" : "white",
            }}
            className="text-white text-xl"
          >
            Junior Garcia
          </span>
        }
        description={
          <Link href="https://twitter.com/jrgarciadev" size={"md"} isExternal>
            @jrgarciadev
          </Link>
        }
        avatarProps={{
          src: "https://avatars.githubusercontent.com/u/30373425?v=4",
          size: "lg",
        }}
      />
    </div>
  )
}

export default SimpleUserContainer
