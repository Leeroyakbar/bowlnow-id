import ImageSection from "./ImageSection"
import TextSection from "./TextSection"

export default function Home() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden" id="home">
      <div className="container mx-auto px-4 py-8 md:py-20 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-around min-h-[70vh] gap-8 lg:gap-0">
          {/* Left Section - Text Content */}
          <TextSection />
          {/* Right Section - Image */}
          <ImageSection />
        </div>
      </div>

      {/* Mobile-specific floating elements */}
      {/* <div className="block md:hidden absolute top-20 left-4 w-8 h-8 bg-yellow-400 rounded-full opacity-20 animate-bounce"></div> */}
      {/* <div className="block md:hidden absolute bottom-32 right-8 w-6 h-6 bg-orange-400 rounded-full opacity-25 animate-bounce" style={{ animationDelay: "0.5s" }}></div> */}
    </div>
  )
}
