import { useNavigate } from "react-router-dom"
import HeadingPopular from "./HeadingPopular"
import MenuItems from "./MenuItems"

export default function PopularMenu({ cart, addCart, removeCart }) {
  const navigate = useNavigate()

  return (
    <div className="min-h-fit bg-gray-50 relative overflow-hidden" id="popular-menu">
      <div className="container mx-auto py-8 md:py-10 relative z-10">
        <HeadingPopular />
        <MenuItems cart={cart} addCart={addCart} removeCart={removeCart} />

        <button onClick={() => navigate("/menu")} className="pb-4 text-yellow-500 hover:text-yellow-600 font-medium underline">
          More Menu →
        </button>
      </div>
    </div>
  )
}
