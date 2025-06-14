import { motion } from "framer-motion"

export default function Card({ title, description, image }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.2,
        delay: 0.5,
        ease: [0, 0.71, 0.9, 1.01],
      }}
      className="w-full md:w-1/4 p-6 rounded-lg hover:shadow-md hover:scale-105 transition-all duration-300 flex flex-col"
    >
      <div className="mb-4 text-orange-500">
        <img src={image} alt={title} className="w-3/4 mx-auto" />
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
      <p className="text-gray-600 flex-grow">{description}</p>
    </motion.div>
  )
}
