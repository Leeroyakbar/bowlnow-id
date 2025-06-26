import { jwtDecode } from "jwt-decode"
import toast from "react-hot-toast"
import { Navigate } from "react-router-dom"

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token")

  if (!token) {
    return <Navigate to="/auth" replace />
  }

  console.log("token", token)
  try {
    const decoded = jwtDecode(token)
    console.log(decoded)
    const now = Date.now() / 1000

    if (decoded.exp < now) {
      localStorage.removeItem("token")
      return <Navigate to="/auth" replace />
    }

    if (decoded.role !== "admin") {
      return <Navigate to="/" replace />
    }
    return children
  } catch (err) {
    console.error("Token invalid", err)
    localStorage.removeItem("token")
    toast.error("invalid token!")
    return <Navigate to="/auth" replace />
  }
}
