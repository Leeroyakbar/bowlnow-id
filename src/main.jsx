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
import { AuthViewProvider } from "./components/context/AuthContext.jsx"
import ProfileCustomer from "./components/profile/ProfileCustomer.jsx"
import MobileTransaction from "./components/profile/mobile/MobileTransaction.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthViewProvider>
      <BrowserRouter>
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<App />} />
            <Route path="/menu" element={<MenuPage />} />
          </Route>
          <Route path="/auth" element={<Auth />} />

          {/* private route */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["customer"]} />}>
            <Route path="/profile" element={<ProfileCustomer />} />
            <Route path="/profile/transactions" element={<MobileTransaction />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthViewProvider>
  </StrictMode>
)
