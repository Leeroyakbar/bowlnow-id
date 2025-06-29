import { Navigate, Outlet, useLocation } from "react-router-dom"
import { jwtDecode } from "jwt-decode"

export default function ProtectedRoute({ allowedRoles }) {
  const token = localStorage.getItem("token")
  const location = useLocation()

  if (!token) return <Navigate to="/auth" replace state={{ from: location }} />

  try {
    const decoded = jwtDecode(token)
    const now = Date.now() / 1000

    if (decoded.exp < now) {
      localStorage.removeItem("token")
      return <Navigate to="/auth" replace state={{ from: location }} />
    }

    if (!allowedRoles.includes(decoded.role)) {
      // Kalau role tidak diizinkan, redirect ke halaman umum
      return <Navigate to="/" replace />
    }

    return <Outlet />
  } catch (err) {
    console.error("Token invalid", err)
    localStorage.removeItem("token")
    return <Navigate to="/" replace />
  }
}
