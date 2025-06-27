import { useState } from "react"
import InputField from "./InputField"
import axios from "axios"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export default function LoginForm() {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

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

  const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
    </svg>
  )

  const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
    </svg>
  )

  return (
    <form className="space-y-6" onSubmit={handleLogin}>
      <InputField id={"username"} type={"text"} placeholder={"Username"} icon={<MailIcon />} value={userName} onChange={(e) => setUserName(e.target.value)} />
      <InputField id={"password"} type={"password"} placeholder={"Kata Sandi"} icon={<LockIcon />} value={password} onChange={(e) => setPassword(e.target.value)} />
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-transform transform hover:scale-105"
        >
          Masuk
        </button>
      </div>
      <div className="text-right">
        <a href="#" className="text-sm text-orange-600 hover:text-orange-500">
          Lupa kata sandi?
        </a>
      </div>
    </form>
  )
}
