export default function HomeSection() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 py-8 md:py-20 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-around min-h-[70vh] gap-8 lg:gap-0">
          {/* Left Section - Text Content */}
          <section className="flex-1 text-gray-800 lg:pr-8 text-center lg:text-left order-2 lg:order-1">
            <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4 md:mb-6">
              Enjoy Your <br />
              <span className="text-yellow-400">Delicious Food</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed mb-6 md:mb-8 text-gray-600 max-w-lg mx-auto lg:mx-0">
              We will fill your tummy with delicious food
              <span className="hidden sm:inline">
                <br />
              </span>
              <span className="sm:hidden"> </span>
              with fast delivery
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-yellow-400 text-white px-6 md:px-8 py-3 rounded-full font-semibold hover:bg-yellow-500 transition-colors shadow-lg text-sm md:text-base">Order Now</button>
              <button className="border-2 border-yellow-400 text-yellow-500 px-6 md:px-8 py-3 rounded-full font-semibold hover:bg-yellow-400 hover:text-white transition-colors text-sm md:text-base">View Menu</button>
            </div>
          </section>

          {/* Right Section - Image */}
          <section className="flex-1 flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
              {/* Placeholder for food image */}
              <div className="text-center text-gray-600">
                <div className="text-4xl md:text-6xl mb-2">
                  <img src="../../../public/home-img-1.png" alt="Delicious Food" className="rotating-image" />
                </div>
              </div>

              {/* Decorative Elements - visible only on large screens */}
              <div className="hidden md:block absolute -top-4 -right-4 w-20 h-20 bg-yellow-300 rounded-full opacity-30"></div>
              <div className="hidden md:block absolute -bottom-6 -left-6 w-16 h-16 bg-white rounded-full opacity-50 shadow-lg"></div>
              <div className="hidden md:block absolute top-1/4 -left-4 w-8 h-8 bg-orange-300 rounded-full opacity-40 animate-pulse"></div>
              <div className="hidden md:block absolute bottom-1/4 -right-6 w-12 h-12 bg-red-300 rounded-full opacity-30 animate-pulse" style={{ animationDelay: "1s" }}></div>
            </div>
          </section>
        </div>
      </div>

      {/* Mobile-specific floating elements */}
      <div className="block md:hidden absolute top-20 left-4 w-8 h-8 bg-yellow-400 rounded-full opacity-20 animate-bounce"></div>
      <div className="block md:hidden absolute bottom-32 right-8 w-6 h-6 bg-orange-400 rounded-full opacity-25 animate-bounce" style={{ animationDelay: "0.5s" }}></div>
    </div>
  )
}
