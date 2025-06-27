import toast from "react-hot-toast"
import InputField from "./InputField"
import { useState } from "react"
import { ShieldUser } from "lucide-react"
import { User } from "lucide-react"
import { Lock } from "lucide-react"
import axios from "axios"

export default function RegisterForm({ setIsLoginView }) {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const roleId = "469415d7-05bf-4f71-9b0c-9645236f0805" // customer hardcoded

  const handleRegister = async (e) => {
    e.preventDefault()
    // Logika untuk registrasi

    try {
      const res = await axios.post("http://127.0.0.1:3000/users/register", {
        user_name: userName,
        password: password,
        full_name: fullName,
        role_id: roleId,
        guest_flag: 0,
      })
      console.log(res.data)

      toast.success("Registrasi berhasil! Silakan login")
      setIsLoginView(true)
    } catch (error) {
      console.log(error)
    }
  }

  // Form untuk Registrasi
  return (
    <form className="space-y-6" onSubmit={handleRegister}>
      <InputField id={"fullname"} type={"text"} placeholder={"Nama Lengkap"} icon={<User color="#9f9fa9" />} value={fullName} onChange={(e) => setFullName(e.target.value)} />
      <InputField id={"username"} type={"text"} placeholder={"Username"} icon={<ShieldUser color="#9f9fa9" />} value={userName} onChange={(e) => setUserName(e.target.value)} />
      <InputField id={"password"} type={"password"} placeholder={"Kata Sandi"} icon={<Lock color="#9f9fa9" />} value={password} onChange={(e) => setPassword(e.target.value)} />
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-transform transform hover:scale-105"
        >
          Daftar Akun
        </button>
      </div>
    </form>
  )
}
