import { motion } from "framer-motion"

export default function WhyUsSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: -100 }} // Muncul dari kiri
      whileInView={{ opacity: 1, y: 0 }} // Saat terlihat di viewport
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.5 }}
      className="pb-7"
    >
      <div className="container mx-auto flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl sm:text-4xl lg:text-5xl pt-24 font-bold text uppercase" id="choose-us">
          Why <span className="text-yellow-400">Choose Us?</span>
        </h1>
      </div>
    </motion.section>
  )
}
