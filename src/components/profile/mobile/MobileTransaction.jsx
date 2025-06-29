import { ArrowLeft } from "lucide-react"
import { ChevronRight } from "lucide-react"
import { BadgeDollarSign } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function MobileTransaction() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <button className="p-4 flex items-center space-x-2 text-gray-600 hover:text-gray-800" onClick={() => navigate(-1)}>
        <ArrowLeft size={20} />
        <span className="font-semibold">Riwayat Transaksi</span>
      </button>
      <div className="flex justify-between items-center px-4 py-4 hover:bg-gray-100">
        <div className="flex items-center space-x-4">
          <BadgeDollarSign size={20} />
          <span className="text-gray-800 font-medium">Riwayat Transaksi</span>
        </div>
        <ChevronRight size={20} />
      </div>
    </div>
  )
}
