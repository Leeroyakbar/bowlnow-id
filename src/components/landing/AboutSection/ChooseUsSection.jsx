import { useEffect } from "react"

import Card from "./Card"
export default function ChooseUsSection() {
  const data = [
    {
      title: "Easy To Order",
      description: "Order your favorite food in just a few clicks through our user-friendly app",
      image: "../../../../public/card/easy-to-order.png",
    },
    {
      title: "Fastest Delivery",
      description: "Your food will arrive in less than 30 minutes, ensuring a satisfying experience",
      image: "../../../../public/card/fast-delivery.png",
    },
    {
      title: "Quality Ingredients",
      description: "We use only the freshest ingredients to ensure the best flavor and texture",
      image: "../../../../public/card/best-quality.png",
    },
  ]

  return (
    <div className="py-12 mb-12">
      <div className="container mx-auto px-4 ">
        <div className="flex flex-col md:flex-row gap-8 justify-around items-stretch">
          {data.map((item, index) => (
            <Card key={index} title={item.title} description={item.description} image={item.image} />
          ))}
        </div>
      </div>
    </div>
  )
}
