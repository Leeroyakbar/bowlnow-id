import { Trash2 } from "lucide-react"
import { Plus } from "lucide-react"
import { Edit } from "lucide-react"
import { useState } from "react"
import Modal from "../common/Modal"

export default function AdminCategory({ categories, setCategories, editingItem, setEditingItem }) {
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [categoryForm, setCategoryForm] = useState({ name: "", description: "" })

  const handleAddCategory = () => {
    if (editingItem) {
      setCategories(categories.map((c) => (c.id === editingItem.id ? { ...categoryForm, id: editingItem.id, itemCount: editingItem.itemCount } : c)))
    } else {
      setCategories([...categories, { ...categoryForm, id: Date.now(), itemCount: 0 }])
    }
    setShowCategoryModal(false)
    setCategoryForm({ name: "", description: "" })
    setEditingItem(null)
  }

  const handleEditCategory = (category) => {
    setCategoryForm(category)
    setEditingItem(category)
    setShowCategoryModal(true)
  }

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter((c) => c.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Manajemen Kategori</h2>
        <button onClick={() => setShowCategoryModal(true)} className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-purple-700">
          <Plus size={16} />
          <span>Tambah Kategori</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-white p-6 rounded-lg shadow-sm ">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
              <div className="flex space-x-2">
                <button onClick={() => handleEditCategory(category)} className="text-blue-600 hover:text-blue-900">
                  <Edit size={16} />
                </button>
                <button onClick={() => handleDeleteCategory(category.id)} className="text-red-600 hover:text-red-900">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4">{category.description}</p>
            <div className="text-sm text-gray-500">
              <span className="font-medium">{category.itemCount}</span> items
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={showCategoryModal}
        onClose={() => {
          setShowCategoryModal(false)
          setEditingItem(null)
          setCategoryForm({ name: "", description: "" })
        }}
        title={editingItem ? "Edit Kategori" : "Tambah Kategori"}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Kategori</label>
            <input type="text" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={categoryForm.name} onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
            <textarea
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              value={categoryForm.description}
              onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
            />
          </div>
          <div className="flex space-x-3 pt-4">
            <button onClick={handleAddCategory} className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700">
              {editingItem ? "Update" : "Tambah"}
            </button>
            <button
              onClick={() => {
                setShowCategoryModal(false)
                setEditingItem(null)
                setCategoryForm({ name: "", description: "" })
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
