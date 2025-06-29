import { X } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useAuthView } from "../context/AuthContext"
import Guest from "./Guest"

export default function ProfileModal({ isOpen, onClose }) {
  const navigate = useNavigate()
  const { setIsLoginView } = useAuthView()
  const token = localStorage.getItem("token")
  const isLogin = !!token

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex justify-center items-center px-4" onClick={onClose}>
      <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-lg relative" onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-4 right-4 text-gray-700 hover:text-red-500" onClick={onClose}>
          <X />
        </button>

        {isLogin ? navigate("/profile") : <Guest setIsLoginView={setIsLoginView} navigate={navigate} />}
      </div>
    </div>
  )
}
