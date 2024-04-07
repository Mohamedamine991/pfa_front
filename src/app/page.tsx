import { Navbar } from "@/components/molecules"

import {
  HeroSection,
  KeyFeatures,
  Footer,
  Partners,
  Preview,
  ContactUs,
} from "@/components/organisms"

const App = () => {
  return (
    <main className="w-full h-auto bg-[#F3F3F7] ">
      <Navbar />
      <HeroSection />
      <KeyFeatures />
     
    </main>
  )
}

export default App
