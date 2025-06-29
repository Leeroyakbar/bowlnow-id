import { useState } from "react"
import { Pencil, User as UserIcon } from "lucide-react"
import EditProfileModal from "./EditProfileModal"
export default function ProfileSection({ customer, setCustomer }) {
  const [isEditOpen, setIsEditOpen] = useState(false)

  return (
    <div className="hidden md:block bg-white rounded-xl shadow-md p-6 relative">
      {/* Tombol Edit */}
      <button onClick={() => setIsEditOpen(true)} className="absolute top-6 right-6 flex items-center text-blue-600 hover:text-blue-800">
        <Pencil size={18} className="mr-1" />
        <span>Edit</span>
      </button>

      {/* Header */}
      <h1 className="text-2xl font-bold mb-6">Informasi Profil</h1>

      {/* Foto + Nama */}
      <div className="flex items-center mb-8">
        {customer.photoUrl ? (
          <img src={customer.photoUrl} alt="Foto Customer" className="w-28 h-28 rounded-full object-cover" />
        ) : (
          <div className="w-28 h-28 rounded-full bg-gray-300 flex items-center justify-center">
            <UserIcon size={40} className="text-white" />
          </div>
        )}
        <div className="ml-6">
          <h2 className="text-xl font-semibold">{customer.fullname}</h2>
        </div>
      </div>

      {/* Informasi Detail */}
      <h3 className="text-lg font-bold mb-4">Informasi Detail</h3>
      <div className="space-y-2">
        <DetailItem label="Nama Lengkap" value={customer.fullname} />
        <DetailItem label="Alamat" value={customer.address} />
        <DetailItem label="Nomor HP" value={customer.phone} />
      </div>

      {/* Modal Edit */}
      {isEditOpen && (
        <EditProfileModal
          initialData={customer}
          onClose={() => setIsEditOpen(false)}
          onSave={(updatedData) => {
            setCustomer({
              userId: updatedData?.user_id,
              fullname: updatedData?.full_name,
              address: updatedData?.address,
              phone: updatedData?.phone_number,
              photoUrl: `http://127.0.0.1:3000/${updatedData?.image}`,
            })
            setIsEditOpen(false)
          }}
        />
      )}
    </div>
  )
}

const DetailItem = ({ label, value }) => (
  <div className="flex flex-col sm:flex-row sm:items-center">
    <span className="w-40 font-medium text-gray-700">{label}</span>
    <span className="text-gray-900">{value}</span>
  </div>
)
