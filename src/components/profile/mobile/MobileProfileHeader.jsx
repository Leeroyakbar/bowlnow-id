import { CircleChevronLeft } from "lucide-react"
import { User as UserIcon } from "lucide-react"

export default function MobileProfileHeader({ customer }) {
  return (
    <div className="flex items-center space-x-4">
      <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
        {customer.photoUrl ? <img src={customer.photoUrl} alt="Foto Customer" className="w-16 h-16 rounded-full object-cover" /> : <UserIcon size={32} className="text-white" />}
      </div>
      <div>
        <h2 className="font-medium text-gray-700">{customer.fullname || "Nama Customer"}</h2>
        <p className="font-small text-sm text-gray-700">{customer.phone || "+628xxxx"}</p>
      </div>
    </div>
  )
}
