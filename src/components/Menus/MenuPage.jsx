// import { useState } from "react"

// const mockMenus = [
//   {
//     id: 1,
//     title: "Nasi Goreng Spesial",
//     category: "food",
//     price: 20000,
//     image: "https://source.unsplash.com/400x300/?fried-rice",
//   },
//   {
//     id: 2,
//     title: "Bakso Urat",
//     category: "food",
//     price: 18000,
//     image: "https://source.unsplash.com/400x300/?meatball-soup",
//   },
//   {
//     id: 3,
//     title: "Es Teh Manis",
//     category: "drink",
//     price: 5000,
//     image: "https://source.unsplash.com/400x300/?iced-tea",
//   },
//   {
//     id: 4,
//     title: "Keripik Pisang",
//     category: "jajanan",
//     price: 8000,
//     image: "https://source.unsplash.com/400x300/?banana-chips",
//   },
// ]

// export default function MenuPage() {
//   const [filter, setFilter] = useState("all")
//   const [searchTerm, setSearchTerm] = useState("")

//   const filteredMenus = mockMenus.filter((menu) => {
//     const matchCategory = filter === "all" || menu.category === filter
//     const matchSearch = menu.title.toLowerCase().includes(searchTerm.toLowerCase())
//     return matchCategory && matchSearch
//   })

//   return (
//     <div className="min-h-screen bg-gray-100 px-4 py-10">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-3xl font-bold text-center text-orange-600 mb-8">All Menu</h1>

//         {/* Filter & Search */}
//         <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
//           <div className="flex gap-2">
//             {["all", "food", "drink", "jajanan"].map((cat) => (
//               <button key={cat} onClick={() => setFilter(cat)} className={`px-4 py-2 rounded-full text-sm font-medium border ${filter === cat ? "bg-yellow-400 text-white" : "bg-white text-gray-700"} hover:bg-yellow-300 transition`}>
//                 {cat.charAt(0).toUpperCase() + cat.slice(1)}
//               </button>
//             ))}
//           </div>
//           <input type="text" placeholder="Search menu..." className="px-4 py-2 w-full md:w-64 rounded-md border border-gray-300 focus:ring-2 focus:ring-yellow-400" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
//         </div>

//         {/* Menu Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredMenus.map((menu) => (
//             <div key={menu.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
//               <img src={menu.image} alt={menu.title} className="h-48 w-full object-cover" />
//               <div className="p-4">
//                 <h2 className="text-lg font-semibold text-gray-800">{menu.title}</h2>
//                 <p className="text-sm text-gray-500 capitalize">{menu.category}</p>
//                 <p className="mt-2 text-orange-600 font-bold">Rp {menu.price.toLocaleString("id-ID")}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* No result */}
//         {filteredMenus.length === 0 && <p className="text-center text-gray-500 mt-10">Menu tidak ditemukan.</p>}
//       </div>
//     </div>
//   )
// }

import { useState } from "react"
import { Plus } from "lucide-react"
import { useOutletContext } from "react-router-dom"
import Footer from "../landing/Footer/Footer"

const mockMenus = [
  {
    id: 1,
    title: "Nasi Goreng Spesial",
    category: "food",
    price: 20000,
    image: "/testi/Street Corn Chicken Rice Bowl.jpg",
    // image: "../../../public/testi/Street Corn Chicken Rice Bowl.jpg",
  },
  {
    id: 2,
    title: "Bakso Urat",
    category: "food",
    price: 18000,
    image: "/testi/pexels-seizoenenblog-32436917.jpg",
    // image: "../../../public/testi/pexels-seizoenenblog-32436917.jpg",
  },
  {
    id: 3,
    title: "Es Teh Manis",
    category: "drink",
    price: 5000,
    image: "/testi/Teriyaki Chicken Rice Bowl.jpg",
    // image: "../../../public/testi/Teriyaki Chicken Rice Bowl.jpg",
  },
  {
    id: 4,
    title: "Keripik Pisang",
    category: "jajanan",
    price: 8000,
    image: "/testi/toriyaki-chicken-dark-surface.jpg",
    // image: "../../../public/testi/toriyaki-chicken-dark-surface.jpg",
  },
  {
    id: 5,
    title: "Ayam Bakar",
    category: "food",
    price: 25000,
    image: "/testi/Street Corn Chicken Rice Bowls.jpg",
    // image: "../../../public/testi/Street Corn Chicken Rice Bowls.jpg",
  },
  {
    id: 6,
    title: "Jus Jeruk",
    category: "drink",
    price: 12000,
    image: "/testi/Street Corn Chicken Rice Bowls.jpg",
    // image: "https://source.unsplash.com/400x300/?orange-juice",
  },
]

export default function MenuPage() {
  const { cart, addCart, removeCart } = useOutletContext()
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredMenus = mockMenus.filter((menu) => {
    const matchCategory = filter === "all" || menu.category === filter
    const matchSearch = menu.title.toLowerCase().includes(searchTerm.toLowerCase())
    return matchCategory && matchSearch
  })

  return (
    <>
      <div className="min-h-screen bg-gray-100 px-4 py-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-orange-600 mb-8">All Menu</h1>

          {/* Filter & Search */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="flex gap-2">
              {["all", "food", "drink", "jajanan"].map((cat) => (
                <button key={cat} onClick={() => setFilter(cat)} className={`px-4 py-2 rounded-full text-sm font-medium border ${filter === cat ? "bg-yellow-400 text-white" : "bg-white text-gray-700"} hover:bg-yellow-300 transition`}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
            <input type="text" placeholder="Search menu..." className="px-4 py-2 w-full md:w-64 rounded-md border border-gray-300 focus:ring-2 focus:ring-yellow-400" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>

          {/* Menu Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMenus.map((menu) => (
              <div key={menu.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img src={menu.image} alt={menu.title} className="h-48 w-full object-cover" />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800">{menu.title}</h2>
                  <p className="text-sm text-gray-500 capitalize">{menu.category}</p>
                  <div className="flex justify-between items-center mt-3">
                    <p className="text-orange-600 font-bold">Rp {menu.price.toLocaleString("id-ID")}</p>
                    <div className="flex items-center gap-2">
                      {cart[menu.id] && (
                        <>
                          <button onClick={() => removeCart(menu.id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition">
                            -
                          </button>
                          <span className="font-semibold">{cart[menu.id].qty}</span>
                        </>
                      )}
                      <button onClick={() => addCart(menu)} className="bg-yellow-400 text-white px-3 py-1 rounded-lg hover:bg-yellow-500 transition flex items-center gap-1">
                        <Plus className="w-4 h-4" />
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No result */}
          {filteredMenus.length === 0 && <p className="text-center text-gray-500 mt-10">Menu tidak ditemukan.</p>}
        </div>
      </div>
      <Footer />
    </>
  )
}
