import { useOutletContext } from "react-router-dom"
import Home from "./components/landing/HomeSection/Home"
import About from "./components/landing/AboutSection/About"
import PopularMenu from "./components/landing/PopularMenuSection/PopularMenu"
import Footer from "./components/landing/Footer/Footer"
import TestimonialSection from "./components/landing/Testimonial/TestimonialSection"

export default function App() {
  const { cart, addCart, removeCart, onCartClick } = useOutletContext()

  return (
    <div>
      <Home onCartClick={onCartClick} />
      <About />
      <PopularMenu cart={cart} removeCart={removeCart} addCart={addCart} />
      <TestimonialSection />
      <Footer />
    </div>
  )
}
