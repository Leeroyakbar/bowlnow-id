import React, { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { Users, UtensilsCrossed, ShoppingCart, TrendingUp, Plus, Edit, Trash2, Search, User, LogOut, Home, List, Tag, Receipt, Eye, Check, X } from "lucide-react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()

  // Sample data - dalam implementasi nyata akan dari API
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@email.com", phone: "081234567890", status: "active", joinDate: "2024-01-15" },
    { id: 2, name: "Jane Smith", email: "jane@email.com", phone: "081234567891", status: "active", joinDate: "2024-02-20" },
    { id: 3, name: "Bob Wilson", email: "bob@email.com", phone: "081234567892", status: "inactive", joinDate: "2024-03-10" },
  ])

  const [categories, setCategories] = useState([
    { id: 1, name: "Makanan Utama", description: "Nasi, mie, dan makanan pokok", itemCount: 15 },
    { id: 2, name: "Minuman", description: "Jus, kopi, teh, dan minuman lainnya", itemCount: 10 },
    { id: 3, name: "Snack", description: "Camilan dan makanan ringan", itemCount: 8 },
  ])

  const [foods, setFoods] = useState([
    { id: 1, name: "Nasi Goreng Spesial", category: "Makanan Utama", price: 25000, stock: 50, status: "available" },
    { id: 2, name: "Mie Ayam", category: "Makanan Utama", price: 20000, stock: 30, status: "available" },
    { id: 3, name: "Es Teh Manis", category: "Minuman", price: 5000, stock: 100, status: "available" },
    { id: 4, name: "Keripik Singkong", category: "Snack", price: 10000, stock: 0, status: "unavailable" },
  ])

  const [transactions, setTransactions] = useState([
    { id: 1, customer: "Lee Roy", items: "Nasi Goreng Spesial x2", total: 50000, status: "completed", date: "2024-06-21", time: "14:30" },
    { id: 2, customer: "Lili Rahma", items: "Mie Ayam x1, Es Teh Manis x2", total: 30000, status: "pending", date: "2024-06-21", time: "15:15" },
    { id: 3, customer: "Rahma", items: "Keripik Singkong x3", total: 30000, status: "completed", date: "2024-06-20", time: "16:45" },
  ])

  // Data untuk grafik
  const salesData = [
    { date: "17 Jun", sales: 450000 },
    { date: "18 Jun", sales: 380000 },
    { date: "19 Jun", sales: 520000 },
    { date: "20 Jun", sales: 610000 },
    { date: "21 Jun", sales: 750000 },
  ]

  const todayTransactions = transactions.filter((t) => t.date === "2024-06-21")
  const todayTotal = todayTransactions.reduce((sum, t) => sum + t.total, 0)

  // Modal states
  const [showUserModal, setShowUserModal] = useState(false)
  const [showFoodModal, setShowFoodModal] = useState(false)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)

  // Form states
  const [userForm, setUserForm] = useState({ name: "", email: "", phone: "", status: "active" })
  const [foodForm, setFoodForm] = useState({ name: "", category: "", price: "", stock: "", status: "available" })
  const [categoryForm, setCategoryForm] = useState({ name: "", description: "" })

  // CRUD Functions
  const handleAddUser = () => {
    if (editingItem) {
      setUsers(users.map((u) => (u.id === editingItem.id ? { ...userForm, id: editingItem.id, joinDate: editingItem.joinDate } : u)))
    } else {
      setUsers([...users, { ...userForm, id: Date.now(), joinDate: new Date().toISOString().split("T")[0] }])
    }
    setShowUserModal(false)
    setUserForm({ name: "", email: "", phone: "", status: "active" })
    setEditingItem(null)
  }

  const handleEditUser = (user) => {
    setUserForm(user)
    setEditingItem(user)
    setShowUserModal(true)
  }

  const handleDeleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id))
  }

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

  const updateTransactionStatus = (id, status) => {
    setTransactions(transactions.map((t) => (t.id === id ? { ...t, status } : t)))
  }

  const NavItem = ({ icon: Icon, label, section, active }) => (
    <button onClick={() => setActiveSection(section)} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${active ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}>
      <Icon size={20} />
      <span>{label}</span>
    </button>
  )

  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
          </div>
          {children}
        </div>
      </div>
    )
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    toast.success("Logout berhasil!")
    navigate("/auth")
  }

  const renderDashboard = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-800">{users.length}</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Menu Items</p>
              <p className="text-2xl font-bold text-gray-800">{foods.length}</p>
            </div>
            <UtensilsCrossed className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Transaksi Hari Ini</p>
              <p className="text-2xl font-bold text-gray-800">{todayTransactions.length}</p>
            </div>
            <ShoppingCart className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Penjualan Hari Ini</p>
              <p className="text-2xl font-bold text-gray-800">Rp {todayTotal.toLocaleString()}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm ">
          <h3 className="text-lg font-semibold mb-4">Grafik Penjualan (5 Hari Terakhir)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis tickFormatter={(value) => `${value / 1000}k`} />
              <Tooltip formatter={(value) => [`Rp ${value.toLocaleString()}`, "Penjualan"]} />
              <Line type="monotone" dataKey="sales" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Riwayat Transaksi Terbaru</h3>
          <div className="space-y-3">
            {transactions.slice(0, 5).map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{transaction.customer}</p>
                  <p className="text-sm text-gray-600">{transaction.items}</p>
                  <p className="text-xs text-gray-500">
                    {transaction.date} {transaction.time}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">Rp {transaction.total.toLocaleString()}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${transaction.status === "completed" ? "bg-green-100 text-green-800" : transaction.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}>
                    {transaction.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Manajemen User</h2>
        <button onClick={() => setShowUserModal(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700">
          <Plus size={16} />
          <span>Tambah User</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm ">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input type="text" placeholder="Cari user..." className="w-full pl-10 pr-4 py-2 border-2 focus:border-blue-500 rounded-lg focus:outline-none " value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users
                .filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{user.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${user.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{user.status}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{user.joinDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button onClick={() => handleEditUser(user)} className="text-blue-600 hover:text-blue-900">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => handleDeleteUser(user.id)} className="text-red-600 hover:text-red-900">
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
        isOpen={showUserModal}
        onClose={() => {
          setShowUserModal(false)
          setEditingItem(null)
          setUserForm({ name: "", email: "", phone: "", status: "active" })
        }}
        title={editingItem ? "Edit User" : "Tambah User"}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
            <input type="text" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={userForm.name} onChange={(e) => setUserForm({ ...userForm, name: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={userForm.email} onChange={(e) => setUserForm({ ...userForm, email: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input type="text" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={userForm.phone} onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={userForm.status} onChange={(e) => setUserForm({ ...userForm, status: e.target.value })}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="flex space-x-3 pt-4">
            <button onClick={handleAddUser} className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
              {editingItem ? "Update" : "Tambah"}
            </button>
            <button
              onClick={() => {
                setShowUserModal(false)
                setEditingItem(null)
                setUserForm({ name: "", email: "", phone: "", status: "active" })
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

  const renderFoods = () => (
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

  const renderCategories = () => (
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

  const renderTransactions = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Manajemen Transaksi</h2>

      <div className="bg-white rounded-lg shadow-sm ">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{transaction.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.customer}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{transaction.items}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Rp {transaction.total.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>{transaction.date}</div>
                    <div className="text-xs">{transaction.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${transaction.status === "completed" ? "bg-green-100 text-green-800" : transaction.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {transaction.status === "pending" && (
                      <div className="flex space-x-2">
                        <button onClick={() => updateTransactionStatus(transaction.id, "completed")} className="text-green-600 hover:text-green-900" title="Approve">
                          <Check size={16} />
                        </button>
                        <button onClick={() => updateTransactionStatus(transaction.id, "cancelled")} className="text-red-600 hover:text-red-900" title="Cancel">
                          <X size={16} />
                        </button>
                      </div>
                    )}
                    <button className="text-blue-600 hover:text-blue-900 ml-2" title="View Details">
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderProfile = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Profile Admin</h2>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-6 mb-6">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
            <User size={40} className="text-gray-500" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Admin User</h3>
            <p className="text-gray-600">admin@foodordering.com</p>
            <p className="text-sm text-gray-500">Administrator</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
            <input type="text" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" defaultValue="Admin User" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" defaultValue="admin@foodordering.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">No. Telepon</label>
            <input type="text" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" defaultValue="081234567890" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Administrator</option>
              <option>Manager</option>
            </select>
          </div>
        </div>

        <div className="mt-6 pt-6">
          <h4 className="text-lg font-medium text-gray-800 mb-4">Ubah Password</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password Lama</label>
              <input type="password" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password Baru</label>
              <input type="password" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
        </div>

        <div className="mt-6 flex space-x-4">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">Simpan Perubahan</button>
          <button className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400">Reset</button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <UtensilsCrossed className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-800">Food Ordering Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={() => setActiveSection("profile")} className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
                <User size={20} />
                <span>Profile</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 cursor-pointer" onClick={handleLogout}>
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <nav className="space-y-2">
                <NavItem icon={Home} label="Dashboard" section="dashboard" active={activeSection === "dashboard"} />
                <NavItem icon={Users} label="Users" section="users" active={activeSection === "users"} />
                <NavItem icon={UtensilsCrossed} label="Makanan" section="foods" active={activeSection === "foods"} />
                <NavItem icon={Tag} label="Kategori" section="categories" active={activeSection === "categories"} />
                <NavItem icon={Receipt} label="Transaksi" section="transactions" active={activeSection === "transactions"} />
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeSection === "dashboard" && renderDashboard()}
            {activeSection === "users" && renderUsers()}
            {activeSection === "foods" && renderFoods()}
            {activeSection === "categories" && renderCategories()}
            {activeSection === "transactions" && renderTransactions()}
            {activeSection === "profile" && renderProfile()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
