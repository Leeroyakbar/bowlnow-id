import React, { useState } from "react"
import RegisterForm from "./RegisterForm"
import LoginForm from "./LoginForm"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

export default function Auth() {
  // State untuk mengontrol tampilan antara form login dan register
  const [isLoginView, setIsLoginView] = useState(true)
  const navigate = useNavigate()
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")

  // Handler untuk submit login
  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post("http://127.0.0.1:3000/users/login", {
        user_name: userName,
        password: password,
      })

      const data = res.data

      localStorage.setItem("token", data.data.token)
      toast.success("Login berhasil!")
      setTimeout(() => {
        navigate("/admin")
      }, 1500)
    } catch (error) {
      console.log(error)
      const errMsg = error.response?.data?.errorMessage || "login gagal"
      toast.error(errMsg)
    }
  }

  // Handler untuk submit registrasi
  const handleRegister = (e) => {
    e.preventDefault()
    // Logika untuk registrasi
    console.log("Register attempt:", {
      fullname: e.target.fullname.value,
      email: e.target["reg-email"].value,
      password: e.target["reg-password"].value,
    })
    alert("Registrasi berhasil! Silakan login. (Cek konsol untuk data)")
    setIsLoginView(true) // Arahkan ke tampilan login setelah registrasi
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center font-sans">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            BowlNow<span className="text-orange-500">.id</span>
          </h1>
          <p className="text-gray-500 mt-2">Dasbor Admin</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          {/* Toggle Button */}
          <div className="mb-8 p-1 bg-gray-200 rounded-lg flex justify-around">
            <button onClick={() => setIsLoginView(true)} className={`w-full py-2 rounded-md text-sm font-medium transition-colors ${isLoginView ? "bg-white shadow-md text-orange-600" : "text-gray-600 hover:bg-gray-300"}`}>
              Masuk
            </button>
            <button onClick={() => setIsLoginView(false)} className={`w-full py-2 rounded-md text-sm font-medium transition-colors ${!isLoginView ? "bg-white shadow-md text-orange-600" : "text-gray-600 hover:bg-gray-300"}`}>
              Daftar
            </button>
          </div>

          {/* Menampilkan form berdasarkan state */}
          {isLoginView ? <LoginForm handleLogin={handleLogin} userName={userName} password={password} setUserName={setUserName} setPassword={setPassword} /> : <RegisterForm handleRegister={handleRegister} />}
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          {isLoginView ? "Belum punya akun?" : "Sudah punya akun?"}
          <button onClick={() => setIsLoginView(!isLoginView)} className="font-medium text-orange-600 hover:text-orange-500 ml-1 focus:outline-none">
            {isLoginView ? "Daftar di sini" : "Masuk di sini"}
          </button>
        </p>
        <footer className="text-center mt-8 text-xs text-gray-400">&copy; 2025 BowlNow.Id | All rights reserved</footer>
      </div>
    </div>
  )
}
