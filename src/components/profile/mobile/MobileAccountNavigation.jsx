import { ChevronRight } from "lucide-react"
import { UserPen } from "lucide-react"
import { BadgeDollarSign } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function MobileAccountNavigation() {
  const navigate = useNavigate()

  const menuItems = [
    { label: "Riwayat Transaksi", icon: BadgeDollarSign, path: "transactions" },
    { label: "Perbarui Profil", icon: UserPen, path: "update" },
  ]

  return (
    <div className="bg-white rounded-xl shadow divide-y">
      {menuItems.map((item, idx) => (
        <div key={idx} className="flex justify-between items-center px-4 py-4 hover:bg-gray-100">
          <div className="flex items-center space-x-4" onClick={() => navigate(`/profile/${item.path}`)}>
            <item.icon size={20} />
            <span className="text-gray-800 font-medium">{item.label}</span>
          </div>
          <ChevronRight size={20} />
        </div>
      ))}
    </div>
  )
}
