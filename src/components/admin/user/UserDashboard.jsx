import { Trash2 } from "lucide-react"
import { Plus } from "lucide-react"
import { Search } from "lucide-react"
import { Edit } from "lucide-react"
import { useState } from "react"
import Modal from "../common/Modal"

export default function UserDasboard({ users, setUsers }) {
  const [showUserModal, setShowUserModal] = useState(false)
  const [userForm, setUserForm] = useState({ name: "", email: "", phone: "", status: "active" })

  const [editingItem, setEditingItem] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

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

  return (
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
}
