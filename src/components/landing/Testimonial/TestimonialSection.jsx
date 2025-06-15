import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const testimonials = [
  {
    id: 1,
    name: "Ayu Wulandari",
    message: "Nasi Gorengnya enak banget, rasanya pas dan pengirimannya cepat!",
    photo: "https://randomuser.me/api/portraits/women/21.jpg",
  },
  {
    id: 2,
    name: "Budi Santoso",
    message: "Saya suka banget Chicken Katsu-nya, renyah dan porsinya pas.",
    photo: "https://randomuser.me/api/portraits/men/34.jpg",
  },
  {
    id: 3,
    name: "Siti Nurhaliza",
    message: "Pelayanan cepat, makanan hangat sampai. Terbaik pokoknya!",
    photo: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    id: 4,
    name: "Dewi Anggraini",
    message: "Terima kasih! Bolu kukusnya lembut banget dan tidak kemanisan.",
    photo: "https://randomuser.me/api/portraits/women/30.jpg",
  },
]

export default function TestimonialSection() {
  const [index, setIndex] = useState(0)

  const next = () => setIndex((prev) => (prev + 2) % testimonials.length)
  const prev = () => setIndex((prev) => (prev - 2 + testimonials.length) % testimonials.length)

  return (
    <section className="bg-white py-20 px-4 relative overflow-hidden" id="testimonials">
      <div className="container mx-auto flex flex-col md:flex-row gap-12 items-center relative z-10">
        {/* LEFT IMAGE LAYOUT */}
        <div className="flex-1 grid grid-rows-2 gap-4 max-w-sm relative z-10">
          <div className="row-span-1">
            <img src="../../../../public/testi/toriyaki-chicken-dark-surface.jpg" alt="Customer 1" className="rounded-xl object-cover w-full h-full" />
          </div>
          <div className="row-span-1 grid grid-cols-2 gap-4">
            <img src="../../../../public/testi/pexels-seizoenenblog-32436917.jpg" alt="Customer 2" className="rounded-xl object-cover w-full h-full" />
            <img src="../../../../public/testi/Teriyaki Chicken Rice Bowl.jpg" alt="Customer 3" className="rounded-xl object-cover w-full h-full" />
          </div>
        </div>

        {/* FLOATING BACKGROUND IMAGE */}
        <img src="../../../../public/testi/pexels-seizoenenblog-32436917.jpg" alt="BG" className="hidden md:block absolute left-0 top-0 w-[400px] opacity-10 blur-2xl z-0" />

        {/* RIGHT TESTIMONIAL CARDS */}
        <div className="flex-1 text-center md:text-left relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">What our customers say about us</h2>

          <AnimatePresence mode="wait">
            <motion.div key={index} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.5 }} className="grid sm:grid-cols-2 gap-6">
              {testimonials.slice(index, index + 2).map((item) => (
                <div key={item.id} className="bg-white border border-gray-200 p-6 rounded-xl shadow-md hover:shadow-xl transition-all">
                  <div className="flex items-center gap-4 mb-4">
                    <img src={item.photo} alt={item.name} className="w-12 h-12 rounded-full object-cover" />
                    <div className="text-left">
                      <h4 className="text-lg font-semibold text-gray-800">{item.name}</h4>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed italic">"{item.message}"</p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* CONTROLS */}
          <div className="flex justify-center md:justify-start gap-4 mt-6">
            <button onClick={prev} className="p-2 rounded-full bg-yellow-400 hover:bg-yellow-500 transition text-white shadow">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={next} className="p-2 rounded-full bg-yellow-400 hover:bg-yellow-500 transition text-white shadow">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
