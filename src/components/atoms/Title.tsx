const Title = ({ ...props }) => {
  return (
    <h1 className="text-center text-[#2B3E6C] font-bold quick py-5 text-xl md:text-2xl leading-9">
      {props.children}
    </h1>
  )
}

export default Title
