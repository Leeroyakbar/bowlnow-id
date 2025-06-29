import { LogOut } from "lucide-react"
import { BadgeDollarSign } from "lucide-react"
import { CircleChevronLeft } from "lucide-react"
import { User } from "lucide-react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export default function ProfileNavigation({ activeSection, setActiveSection }) {
  const navigate = useNavigate()

  const NavItem = ({ icon: Icon, label, section }) => (
    <button onClick={() => setActiveSection(section)} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeSection === section ? "bg-yellow-400 text-white" : "text-gray-600 hover:bg-gray-100"}`}>
      <Icon size={20} />
      <span>{label}</span>
    </button>
  )

  return (
    <aside className="w-64 h-screen bg-white p-4 flex flex-col justify-between shadow-md">
      <div className="space-y-2">
        <button onClick={() => navigate("/")} className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
          <CircleChevronLeft size={20} />
          <span>Kembali</span>
        </button>
        <NavItem icon={User} label="Profile" section="profile" />
        <NavItem icon={BadgeDollarSign} label="Transactions" section="transactions" />
      </div>

      <button
        onClick={() => {
          localStorage.removeItem("token")
          toast.success("Logout berhasil!")
          setTimeout(() => {
            navigate("/")
          }, 100) // redirect ke landing/home setelah logout
        }}
        className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors mt-8"
      >
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </aside>
  )
}
