import Dash from "./../../../public/HalfDash.png"
const Preview = () => {
  return (
    <section className="w-full h-screen flex items-center justify-center">
      <aside className="w-1/2 h-full flex items-center justify-center">
        <h1 className="font-bold text-[#2B3E6C] text-4xl quick">
          Control Different Cloud Providers Through Inariam , Single Powerful
          Cloud Manager
        </h1>
      </aside>
      <aside
        className="w-5/12 h-full"
        style={{
          backgroundImage: `url(${Dash.src})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></aside>
    </section>
  )
}

export default Preview
