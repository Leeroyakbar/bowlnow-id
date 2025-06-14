import { useState } from "react"
import Navigation from "./components/common/Navigation"
import { useCallback } from "react"
import Home from "./components/landing/HomeSection/Home"
import About from "./components/landing/AboutSection/About"
import PopularMenu from "./components/landing/PopularMenuSection/PopularMenu"
import CheckoutModal from "./components/common/CheckoutModal"

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState("home")
  const [cart, setCart] = useState({})
  const [showCart, setShowCart] = useState(false)

  const handleCurrentPage = (page) => setCurrentPage(page)

  const addCart = (product) => {
    setCart((prev) => {
      const currentQty = prev[product.id]?.qty || 0
      return {
        ...prev,
        [product.id]: {
          ...product,
          qty: currentQty + 1,
        },
      }
    })
  }

  const removeCart = (productId) => {
    setCart((prev) => {
      const updated = { ...prev }
      if (updated[productId]) {
        updated[productId].qty -= 1
        if (updated[productId].qty <= 0) delete updated[productId]
      }
      return { ...updated }
    })
  }

  // Gunakan useCallback untuk stabilkan reference
  // const handleCurrentPage = useCallback((page) => {
  //   console.log("Confirmed page change:", page)
  //   setCurrentPage(page)
  // }, [])

  return (
    <div className="min-h-screen bg-gray-50 scroll-smooth">
      <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} currentPage={currentPage} onCurrentPage={handleCurrentPage} cart={cart} onCartClick={() => setShowCart(true)} />
      <Home />
      <About />
      <PopularMenu cart={cart} removeCart={removeCart} addCart={addCart} />
      <CheckoutModal isOpen={showCart} onClose={() => setShowCart(false)} cart={cart} removeCart={removeCart} />
    </div>
  )
}
