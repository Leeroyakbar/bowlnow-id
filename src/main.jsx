import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from "./App.jsx"
import MenuPage from "./components/Menus/MenuPage.jsx"
import Layout from "./components/common/Layout.jsx"
import "./index.css"
import AdminDashboard from "./components/admin/AdminDashboard.jsx"
import Auth from "./components/auth/Auth.jsx"
import { Toaster } from "react-hot-toast"
import ProtectedRoute from "./components/routes/ProtectedRoute.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="/menu" element={<MenuPage />} />
        </Route>
        <Route path="/auth" element={<Auth />} />

        {/* private route */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
