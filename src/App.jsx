import { useState } from "react"
import Navigation from "./components/common/Navigation"
import { useCallback } from "react"
import Home from "./components/landing/HomeSection/Home"
import About from "./components/landing/AboutSection/About"

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState("home")

  // Gunakan useCallback untuk stabilkan reference
  const handleCurrentPage = useCallback((page) => {
    console.log("Confirmed page change:", page)
    setCurrentPage(page)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 scroll-smooth">
      <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} currentPage={currentPage} onCurrentPage={handleCurrentPage} />
      <Home />
      <About />
    </div>
  )
}
