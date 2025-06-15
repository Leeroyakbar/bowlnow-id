import { useNavigate } from "react-router-dom"

export default function TextSection({ onCartClick }) {
  const navigate = useNavigate()
  return (
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
        <button className="bg-yellow-400 text-white px-6 md:px-8 py-3 rounded-full font-semibold hover:bg-yellow-500 transition-colors shadow-lg text-sm md:text-base" onClick={onCartClick}>
          Order Now
        </button>
        <button className="border-2 border-yellow-400 text-yellow-500 px-6 md:px-8 py-3 rounded-full font-semibold hover:bg-yellow-400 hover:text-white transition-colors text-sm md:text-base" onClick={() => navigate("/menu")}>
          View Menu
        </button>
      </div>
    </section>
  )
}
