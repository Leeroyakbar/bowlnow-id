import { useState } from "react"
import { X } from "lucide-react"

export default function CheckoutModal({ isOpen, onClose, cart, removeCart }) {
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [note, setNote] = useState("")

  if (!isOpen) return null

  const total = Object.values(cart).reduce((sum, item) => sum + item.qty * 15000, 0)

  const handleCheckout = () => {
    const phoneNumber = "6282273366718"

    const orderDetails = Object.values(cart)
      .map((item) => `- ${item.title} (${item.qty}x)`)
      .join("\n")

    const message = `
Halo Admin! Saya ingin melakukan pemesanan:

${orderDetails}

Total: Rp. ${total.toLocaleString("id-ID")}

Nama: ${name}
Alamat: ${address}
Catatan: ${note}
    `.trim()

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex justify-center items-center px-4" onClick={onClose}>
      <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-lg relative" onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-3 right-3 text-gray-500 hover:text-red-500" onClick={onClose}>
          <X />
        </button>
        <h2 className="text-xl font-bold mb-4 text-center text-gray-800">Checkout</h2>

        {Object.keys(cart).length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {/* Cart Items */}
            {Object.values(cart).map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <h4 className="font-medium text-gray-800">{item.title}</h4>
                  <p className="text-sm text-gray-500">{item.qty} x Rp. 15.000</p>
                </div>
                <button onClick={() => removeCart(item.id)} className="text-red-500 text-sm hover:underline">
                  Remove
                </button>
              </div>
            ))}

            <div className="text-right font-semibold text-gray-700">Total: Rp. {total.toLocaleString("id-ID")}</div>

            {/* Form */}
            <input type="text" placeholder="Nama lengkap" value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-gray-300 px-4 py-2 rounded-lg" required />
            <textarea placeholder="Alamat pengiriman" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full border border-gray-300 px-4 py-2 rounded-lg" rows={2} required />
            <input type="text" placeholder="Catatan (opsional)" value={note} onChange={(e) => setNote(e.target.value)} className="w-full border border-gray-300 px-4 py-2 rounded-lg" />

            <button onClick={handleCheckout} className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg transition-all">
              Checkout Now via WhatsApp
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
