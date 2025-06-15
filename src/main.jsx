import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from "./App.jsx"
import MenuPage from "./components/Menus/MenuPage.jsx"
import Layout from "./components/common/Layout.jsx"
import "./index.css"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="/menu" element={<MenuPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
