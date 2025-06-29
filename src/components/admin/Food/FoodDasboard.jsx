import { Trash2 } from "lucide-react"
import { Plus } from "lucide-react"
import { Edit } from "lucide-react"
import { useState } from "react"
import Modal from "../common/Modal"

export default function FoodDashboard({ foods, setFoods, categories }) {
  const [showFoodModal, setShowFoodModal] = useState(false)
  const [foodForm, setFoodForm] = useState({ name: "", category: "", price: "", stock: "", status: "available" })

  const [editingItem, setEditingItem] = useState(null)
  const handleAddFood = () => {
    if (editingItem) {
      setFoods(foods.map((f) => (f.id === editingItem.id ? { ...foodForm, id: editingItem.id, price: parseInt(foodForm.price), stock: parseInt(foodForm.stock) } : f)))
    } else {
      setFoods([...foods, { ...foodForm, id: Date.now(), price: parseInt(foodForm.price), stock: parseInt(foodForm.stock) }])
    }
    setShowFoodModal(false)
    setFoodForm({ name: "", category: "", price: "", stock: "", status: "available" })
    setEditingItem(null)
  }

  const handleEditFood = (food) => {
    setFoodForm({ ...food, price: food.price.toString(), stock: food.stock.toString() })
    setEditingItem(food)
    setShowFoodModal(true)
  }

  const handleDeleteFood = (id) => {
    setFoods(foods.filter((f) => f.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Manajemen Makanan</h2>
        <button onClick={() => setShowFoodModal(true)} className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700">
          <Plus size={16} />
          <span>Tambah Makanan</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm ">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stok</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {foods.map((food) => (
                <tr key={food.id}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{food.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{food.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">Rp {food.price.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{food.stock}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${food.status === "available" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{food.status}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button onClick={() => handleEditFood(food)} className="text-blue-600 hover:text-blue-900">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => handleDeleteFood(food.id)} className="text-red-600 hover:text-red-900">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={showFoodModal}
        onClose={() => {
          setShowFoodModal(false)
          setEditingItem(null)
          setFoodForm({ name: "", category: "", price: "", stock: "", status: "available" })
        }}
        title={editingItem ? "Edit Makanan" : "Tambah Makanan"}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Makanan</label>
            <input type="text" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={foodForm.name} onChange={(e) => setFoodForm({ ...foodForm, name: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
            <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={foodForm.category} onChange={(e) => setFoodForm({ ...foodForm, category: e.target.value })}>
              <option value="">Pilih Kategori</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Harga</label>
            <input type="number" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={foodForm.price} onChange={(e) => setFoodForm({ ...foodForm, price: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stok</label>
            <input type="number" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={foodForm.stock} onChange={(e) => setFoodForm({ ...foodForm, stock: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={foodForm.status} onChange={(e) => setFoodForm({ ...foodForm, status: e.target.value })}>
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>
          <div className="flex space-x-3 pt-4">
            <button onClick={handleAddFood} className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
              {editingItem ? "Update" : "Tambah"}
            </button>
            <button
              onClick={() => {
                setShowFoodModal(false)
                setEditingItem(null)
                setFoodForm({ name: "", category: "", price: "", stock: "", status: "available" })
              }}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
            >
              Batal
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
