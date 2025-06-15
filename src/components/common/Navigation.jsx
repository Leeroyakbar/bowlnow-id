import { ChefHat, Menu as MenuIcon, X, Search, ShoppingCart } from "lucide-react"
import clsx from "clsx"
import { Link, useLocation } from "react-router-dom"

export default function Navigation({ isMenuOpen, setIsMenuOpen, cart, onCartClick }) {
  const location = useLocation()

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-orange-600 cursor-pointer">
            <img src="../../../public/logo-bowl.png" alt="Lili's Kitchen" className="w- h-8" />
          </Link>

          {/* Mobile - Search + Cart + Menu */}
          <div className="md:hidden flex items-center gap-2">
            <div className="text-gray-700 hover:text-orange-600 cursor-pointer"></div>
            <div className="relative text-gray-700 hover:text-yellow-400 cursor-pointer transition-colors" onClick={onCartClick}>
              <ShoppingCart className="w-6 h-6" />
              {Object.keys(cart).length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full animate-bounce">{Object.values(cart).reduce((sum, item) => sum + item.qty, 0)}</span>
              )}
            </div>
            <button className="text-gray-700 hover:text-orange-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className={`text-gray-700 hover:text-yellow-400 ${location.pathname === "/" ? "text-yellow-400" : ""}`}>
              Home
            </Link>
            <a href="#choose-us" className={`${location.pathname === "/menu" ? "hidden" : ""} text-gray-700 hover:text-yellow-400 ${location.hash === "#choose-us" ? "text-yellow-400" : ""}`}>
              About Us
            </a>
            <Link to="/menu" className={`text-gray-700 hover:text-yellow-400 ${location.pathname === "/menu" ? "text-yellow-400" : ""}`}>
              All Menu
            </Link>
            <a href="#testimonials" className={`${location.pathname === "/menu" ? "hidden" : ""} text-gray-700 hover:text-yellow-400 ${location.hash === "#choose-us" ? "text-yellow-400" : ""}`}>
              Testimonials
            </a>

            <div className="relative text-gray-700 hover:text-yellow-400 cursor-pointer transition-colors" onClick={onCartClick}>
              <ShoppingCart className="w-6 h-6" />
              {Object.keys(cart).length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full animate-bounce">{Object.values(cart).reduce((sum, item) => sum + item.qty, 0)}</span>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Items (Animated) */}
        <div className={clsx("md:hidden overflow-hidden transition-all duration-300 ease-in-out", isMenuOpen ? "max-h-60" : "max-h-0")}>
          <div className="flex flex-col space-y-4 pb-4 pt-2">
            <Link to="/" className="text-gray-700 hover:text-yellow-400 text-left" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <a href="#choose-us" className="text-gray-700 hover:text-yellow-400 text-left" onClick={() => setIsMenuOpen(false)}>
              About Us
            </a>
            <Link to="#menu" className={`text-gray-700 hover:text-yellow-400 ${location.pathname === "/menu" ? "text-yellow-400" : ""}`} onClick={() => setIsMenuOpen(false)}>
              Menu
            </Link>
            <Link to="/menu" className={`text-gray-700 hover:text-yellow-400 ${location.pathname === "/menu" ? "text-yellow-400" : ""}`} onClick={() => setIsMenuOpen(false)}>
              All Menu
            </Link>
            <a href="#testimonials" className="text-gray-700 hover:text-yellow-400 text-left" onClick={() => setIsMenuOpen(false)}>
              Testimonials
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
