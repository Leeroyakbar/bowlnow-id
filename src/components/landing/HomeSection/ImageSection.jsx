export default function ImageSection() {
  return (
    <section className="flex-1 flex justify-center lg:justify-end order-1 lg:order-2">
      <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
        {/* Placeholder for food image */}
        <div className="text-center text-gray-600">
          <div className="text-4xl md:text-6xl mb-2">
            <img src="/home-img-1.png" alt="Delicious Food" className="rotating-image" />
          </div>
        </div>

        {/* Decorative Elements - visible only on large screens */}
        <div className="hidden md:block absolute -top-4 -right-4 w-20 h-20 bg-yellow-300 rounded-full opacity-30"></div>
        <div className="hidden md:block absolute -bottom-6 -left-6 w-16 h-16 bg-red-400 rounded-full opacity-50 shadow-lg"></div>
        <div className="hidden md:block absolute top-1/4 -left-4 w-8 h-8 bg-orange-300 rounded-full opacity-40 animate-pulse"></div>
        <div className="hidden md:block absolute bottom-1/4 -right-6 w-12 h-12 bg-red-300 rounded-full opacity-30 animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>
    </section>
  )
}
