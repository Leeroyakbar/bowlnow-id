import { useState } from "react"
import Navigation from "./components/common/Navigation"
import HomeSection from "./components/landing/HomeSection"

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <HomeSection />
    </div>
  )
}
