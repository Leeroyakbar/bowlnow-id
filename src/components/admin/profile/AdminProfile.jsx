import axios from "axios"
import { Pencil } from "lucide-react"
import { User } from "lucide-react"
import { useState } from "react"
import Swal from "sweetalert2"

export default function AdminProfile({ user, setUser }) {
  const [isEdit, setIsEdit] = useState(false)
  const [fullName, setFullName] = useState(user.fullName)
  const [email, setEmail] = useState(user.email)
  const [address, setAddress] = useState(user.address || "")
  const [phone, setPhone] = useState(user.phone)
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl)
  const [photoFile, setPhotoFile] = useState(null) // simpan file asli

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const tempUrl = URL.createObjectURL(file)
      setPhotoUrl(tempUrl)
      setPhotoFile(file)
    }
  }

  const handleUpdateUser = async (e) => {
    e.preventDefault()

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to update this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    })

    if (result.isConfirmed) {
      try {
        const formData = new FormData()
        formData.append("full_name", fullName)
        formData.append("address", address)
        formData.append("phone_number", phone)
        if (photoFile) {
          formData.append("image", photoFile)
        }

        const res = await axios.put(`http://127.0.0.1:3000/users/${user.userId}`, formData)
        console.log("data update ", res)
        setUser({
          ...user,
          fullName: res.data.data.full_name,
          address: res.data.data.address,
          email: res.data.data.email,
          phone: res.data.data.phone_number,
          photoUrl: `http://127.0.0.1:3000/${res.data.data.image}`,
        })

        await Swal.fire({
          title: "Updated!",
          text: "User profile has been updated.",
          icon: "success",
        })
      } catch (error) {
        console.log(error)
        await Swal.fire({
          title: "Error!",
          text: error?.response?.data?.errorMessage || "Failed to update user",
          icon: "error",
        })
      }
    }

    setIsEdit(false)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Profile Admin</h2>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <button onClick={() => setIsEdit(!isEdit)} className={`absolute right-12 flex items-center ${isEdit ? "text-red-600 hover:text-red-700" : "text-blue-600 hover:text-blue-800"} cursor-pointer`}>
          <Pencil size={18} className="mr-1" />
          <span>{isEdit ? "Batal Edit" : "Edit"}</span>
        </button>

        <form onSubmit={handleUpdateUser}>
          <div className="w-28 h-28 mb-4 bg-gray-200 rounded-full flex items-center justify-center relative cursor-pointer" onClick={() => isEdit && document.getElementById("photoInput").click()}>
            {photoUrl ? <img src={photoUrl} alt="photo profile" className="w-28 h-28 rounded-full object-cover" /> : <User size={40} className="text-gray-500" />}
            <input id="photoInput" type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
              <input
                type="text"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEdit ? "bg-gray-100" : ""}`}
                value={fullName}
                disabled={!isEdit}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEdit ? "bg-gray-100" : ""}`}
                disabled={!isEdit}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">No. Telepon</label>
              <input
                type="text"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEdit ? "bg-gray-100" : ""}`}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={!isEdit}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
              <input
                type="text"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEdit ? "bg-gray-100" : ""}`}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                disabled={!isEdit}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 `} disabled>
                <option>Administrator</option>
                <option>Manager</option>
              </select>
            </div>
          </div>

          {isEdit ? (
            <div className="flex justify-end mt-6">
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition cursor-pointer">
                Simpan Perubahan
              </button>
            </div>
          ) : (
            ""
          )}
        </form>

        {/* {isEdit ? (
          <div className="mt-6 pt-6">
            <h4 className="text-lg font-medium text-gray-800 mb-4">Ubah Password</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password Lama</label>
                <input type="password" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password Baru</label>
                <input type="password" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>
        ) : (
          ""
        )} */}
      </div>
    </div>
  )
}
