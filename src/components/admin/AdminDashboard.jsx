import { useState } from "react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import AdminHeader from "./navigation/AdminHeader"
import AdminSidebar from "./navigation/AdminSidebar"
import AdminTransaction from "./transaction/AdminTransaction"
import MainDashboard from "./dashboard/MainDashboard"
import UserDasboard from "./user/UserDashboard"
import FoodDashboard from "./Food/FoodDasboard"
import AdminCategory from "./category/AdminCategory"
import AdminProfile from "./profile/AdminProfile"
import { useEffect } from "react"
import { jwtDecode } from "jwt-decode"
import axios from "axios"

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState("dashboard")

  const [user, setUser] = useState({
    userId: 1,
    fullName: "Lili Cantik",
    address: "Jl. Raya Sibuhuan, Sibuhuan, Padang Lawas",
    phone: "0822-7336-6718",
    photoUrl: "",
    email: "lilirhm.yani@gmail.com",
    role: "admin",
  })
  // const [editingItem, setEditingItem] = useState(null)

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

  const handleLogout = () => {
    localStorage.removeItem("token")
    toast.success("Logout berhasil!")
    navigate("/auth")
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      // handle redirect
      navigate("/auth")
      return
    }

    let decoded
    try {
      decoded = jwtDecode(token)
    } catch (err) {
      localStorage.removeItem("token")
      navigate("/auth")
      return
    }

    const userId = decoded.user_id

    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:3000/users/${userId}`)
        const userData = res?.data?.data
        setUser({
          userId: userData?.user_id,
          fullName: userData?.full_name,
          address: userData?.address,
          phone: userData?.phone_number,
          photoUrl: `http://127.0.0.1:3000/${userData?.image}`,
          email: userData?.email,
          role: userData?.role_name,
        })
      } catch (error) {
        toast.error(error?.response?.data?.errorMessage || "Gagal mengambil data user")
      }
    }

    fetchUser()
  }, [navigate]) // atau [activeSection] jika ingin fetch ulang saat activeSection berubah

  console.log(user)
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header di atas */}
      <AdminHeader setActiveSection={setActiveSection} handleLogout={handleLogout} user={user} />

      {/* Isi: Sidebar & Konten di bawah header */}
      <div className="flex flex-1">
        {/* Sidebar di kiri */}
        <AdminSidebar activeSection={activeSection} setActiveSection={setActiveSection} />

        {/* Main Content di kanan */}
        <div className="flex-1 p-4 overflow-y-auto">
          {activeSection === "dashboard" && <MainDashboard users={users} foods={foods} transactions={transactions} salesData={salesData} />}
          {activeSection === "users" && <UserDasboard users={users} setUsers={setUsers} />}
          {activeSection === "foods" && <FoodDashboard foods={foods} setFoods={setFoods} categories={categories} />}
          {activeSection === "categories" && <AdminCategory categories={categories} setCategories={setCategories} />}
          {activeSection === "transactions" && <AdminTransaction transactions={transactions} setTransactions={setTransactions} />}
          {activeSection === "profile" && <AdminProfile user={user} setUser={setUser} />}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
