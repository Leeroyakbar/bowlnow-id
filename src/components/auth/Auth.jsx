import { useState } from "react"
import RegisterForm from "./RegisterForm"
import LoginForm from "./LoginForm"

export default function Auth() {
  const [isLoginView, setIsLoginView] = useState(true)

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
          {isLoginView ? <LoginForm /> : <RegisterForm setIsLoginView={setIsLoginView} />}
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
