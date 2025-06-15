export default function MenuItems({ cart, removeCart, addCart }) {
  const products = [
    {
      id: 1,
      title: "Sambal Matah",
      category: "Ricebowl",
      description: "Ricebowl with spicy sauce",
      price: "Rp. 15.000",
      image: "/card-menus/sambal-matah.jpg",
      // image: "../../../../public/card-menus/sambal-matah.jpg",
    },
    {
      id: 2,
      title: "Chicken Katsu",
      category: "Ricebowl",
      description: "Ricebowl with spicy sauce",
      price: "Rp. 15.000",
      image: "/card-menus/chicken-katsu.jpg",
      // image: "../../../public/card-menus/chicken-katsu.jpg",
    },
    {
      id: 3,
      title: "Teriyaki Chicken",
      category: "Ricebowl",
      description: "Ricebowl with spicy sauce",
      price: "Rp. 15.000",
      image: "/card-menus/teriyaki-chicken.jpg",
      // image: "../../../../public/card-menus/teriyaki-chicken.jpg",
    },
  ]

  return (
    <div className="py-12 ">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product) => {
          const cartItem = cart[product.id]
          return (
            <div key={product.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 flex flex-col transition-all duration-300">
              <img src={product.image} alt={product.title} className="rounded-xl mb-4 h-40 w-full object-cover" />
              <h3 className="text-xl font-semibold text-gray-800">{product.title}</h3>
              <p className="text-sm text-gray-500">{product.description}</p>
              <p className="text-lg text-gray-800 font-bold mt-2">{product.price}</p>

              <div className="mt-auto pt-4">
                {cartItem ? (
                  <div className="flex items-center justify-center gap-3">
                    <button onClick={() => removeCart(product.id)} className="bg-red-400 text-white px-3 py-1 rounded-full hover:bg-red-500">
                      -
                    </button>
                    <span className="font-semibold text-gray-800">{cartItem.qty}</span>
                    <button onClick={() => addCart(product)} className="bg-green-400 text-white px-3 py-1 rounded-full hover:bg-green-500">
                      +
                    </button>
                  </div>
                ) : (
                  <button onClick={() => addCart(product)} className="bg-yellow-400 text-white w-full py-2 rounded-full font-semibold hover:bg-yellow-500 transition-colors mt-2">
                    Order Now
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
