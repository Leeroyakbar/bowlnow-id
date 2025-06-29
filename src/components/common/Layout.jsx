import { useState } from "react"
import { Outlet, useLocation } from "react-router-dom"
import Navigation from "./Navigation"
import CheckoutModal from "./CheckoutModal"
import { useEffect } from "react"
import GuestCustomer from "./ProfileModal"

export default function Layout() {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cart, setCart] = useState({})
  const [showCart, setShowCart] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

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

  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 scroll-smooth">
      <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} currentPage={location.pathname} cart={cart} onCartClick={() => setShowCart(true)} onProfileClick={() => setShowProfile(true)} />

      {/* Ini me-render halaman yang aktif (App atau MenuPage) dan mengirim props cart */}
      <Outlet context={{ cart, addCart, removeCart, onCartClick: () => setShowCart(true) }} />

      <CheckoutModal isOpen={showCart} onClose={() => setShowCart(false)} cart={cart} removeCart={removeCart} />
      <GuestCustomer isOpen={showProfile} onClose={() => setShowProfile(false)} />
    </div>
  )
}
