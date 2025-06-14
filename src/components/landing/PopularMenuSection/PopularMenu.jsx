import HeadingPopular from "./HeadingPopular"
import MenuItems from "./MenuItems"

export default function PopularMenu({ cart, addCart, removeCart }) {
  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto py-8 md:py-20 relative z-10">
        <HeadingPopular />
        <MenuItems cart={cart} addCart={addCart} removeCart={removeCart} />
      </div>
    </div>
  )
}
