import { useState } from "react"
import { LogOut, BadgeDollarSign, User } from "lucide-react"
import ProfileNavigation from "./navigation/ProfileNavigation"
import ProfileSection from "./information/ProfileSection"
import MobileAccountNavigation from "./mobile/MobileAccountNavigation"
import MobileProfileHeader from "./mobile/MobileProfileHeader"
import { CircleChevronLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import { useEffect } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { ArrowLeft } from "lucide-react"

export default function ProfileCustomer() {
  const navigate = useNavigate()
  console.log("profile customer")
  const [activeSection, setActiveSection] = useState("profile")

  const [customer, setCustomer] = useState({
    userId: 1,
    fullname: "Lili Cantik",
    address: "Jl. Raya Sibuhuan, Sibuhuan, Padang Lawas",
    phone: "0822-7336-6718",
    photoUrl: "",
  })

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const token = localStorage.getItem("token")
        const decoded = jwtDecode(token)
        const userId = decoded.user_id

        const resCustomer = await axios.get(`http://127.0.0.1:3000/users/${userId}`)
        const userData = resCustomer.data.data

        setCustomer({
          userId: userData?.user_id,
          fullname: userData?.full_name,
          address: userData?.address,
          phone: userData?.phone_number,
          photoUrl: `http://127.0.0.1:3000/${userData?.image}`,
        })
      } catch (error) {
        toast.error(error.response?.data?.errorMessage || "Terjadi kesalahan saat mengambil data")
      }
    }

    fetchCustomer()
  }, [])

  return (
    <div className="min-h-screen bg-gray-00 flex flex-col md:flex-row">
      {/* Mobile Profile Header */}
      <div className="md:hidden p-4 bg-white shadow">
        {/* Tombol kembali */}
        <div className="flex items-center mb-5" onClick={() => navigate("/")}>
          <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
            <ArrowLeft size={24} />
            <span className="font-semibold">Kembali</span>
          </button>
        </div>
        <MobileProfileHeader customer={customer} />
      </div>

      {/* Sidebar untuk desktop */}
      <div className="hidden md:block bg">
        <ProfileNavigation activeSection={activeSection} setActiveSection={setActiveSection} />
      </div>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-8">
        {activeSection === "profile" && <ProfileSection customer={customer} setCustomer={setCustomer} />}
        {activeSection === "transactions" && (
          <div>
            <h1 className="text-3xl font-bold mb-4">Riwayat Transaksi</h1>
            <p>Riwayat transaksi customer akan ditampilkan di sini.</p>
          </div>
        )}

        {/* Navigasi akun mirip gojek untuk mobile */}
        <div className="md:hidden mt-6">
          <MobileAccountNavigation />
        </div>
      </main>
    </div>
  )
}
