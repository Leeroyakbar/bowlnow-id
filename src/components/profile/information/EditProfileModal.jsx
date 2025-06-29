import { useState } from "react"
import { X } from "lucide-react"
import axios from "axios"
import toast from "react-hot-toast"
import { useEffect } from "react"

export default function EditProfileModal({ initialData, onClose, onSave }) {
  const userId = initialData.userId
  const [photoFile, setPhotoFile] = useState(null) // simpan file asli
  const [fullname, setFullname] = useState("")
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")
  const [photoUrl, setPhotoUrl] = useState("")

  // Sinkronisasi state dengan initialData
  useEffect(() => {
    setFullname(initialData.fullname || "")
    setAddress(initialData.address || "")
    setPhone(initialData.phone || "")
    setPhotoUrl(initialData.photoUrl || "")
  }, [initialData])

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const tempUrl = URL.createObjectURL(file)
      setPhotoUrl(tempUrl)
      setPhotoFile(file) // simpan file asli untuk diupload
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const formData = new FormData()
      formData.append("full_name", fullname)
      formData.append("address", address)
      formData.append("phone_number", phone)
      if (photoFile) {
        formData.append("image", photoFile)
      }

      console.log("data to update ", formData.entries())

      const res = await axios.put(`http://127.0.0.1:3000/users/${userId}`, formData)

      // console.log("data update ", res.data.data)
      onSave(res.data.data) // panggil onSave dengan data terbaru dari server

      toast.success("User berhasil diupdate")

      onClose()
    } catch (error) {
      console.error("Gagal update user", error)
      toast.error("Gagal update user")
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-xl p-6 w-full max-w-md relative" onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-4 right-4 text-gray-700 hover:text-red-500 cursor-pointer" onClick={onClose}>
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6">Edit Profil</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Foto */}
          <div className="flex flex-col items-center">
            {photoUrl ? (
              <img src={photoUrl} alt="Preview Foto" className="w-24 h-24 rounded-full object-cover mb-2" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center mb-2">
                <p className="text-white text-sm">Unggah Foto</p>
              </div>
            )}

            <label className="cursor-pointer text-gray-600 py-1 px-3 rounded-md">
              Pilih Foto
              <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
            <input type="text" className="w-full border rounded-md p-2" value={fullname} onChange={(e) => setFullname(e.target.value)} required />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Alamat</label>
            <textarea className="w-full border rounded-md p-2" value={address} onChange={(e) => setAddress(e.target.value)} required />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Nomor HP</label>
            <input type="text" className="w-full border rounded-md p-2" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>

          <button type="submit" className="w-full bg-yellow-400 text-white py-2 rounded-md hover:bg-yellow-500">
            Simpan Perubahan
          </button>
        </form>
      </div>
    </div>
  )
}
