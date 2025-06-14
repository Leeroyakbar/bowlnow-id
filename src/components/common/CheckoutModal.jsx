import { X } from "lucide-react"

export default function CheckoutModal({ isOpen, onClose, cart, removeCart }) {
  if (!isOpen) return null

  const total = Object.values(cart).reduce((sum, item) => sum + item.qty * 15000, 0)

  return (
    <div
      className="fixed inset-0 bg-black/30 z-50 flex justify-center items-center px-4"
      onClick={onClose} // klik area luar modal
    >
      <div
        className="bg-white rounded-xl w-full max-w-md p-6 shadow-lg relative"
        onClick={(e) => e.stopPropagation()} // cegah propagasi klik dari dalam modal
      >
        <button className="absolute top-3 right-3 text-gray-500 hover:text-red-500" onClick={onClose}>
          <X />
        </button>
        <h2 className="text-xl font-bold mb-4 text-center text-gray-800">Your Cart</h2>

        {Object.keys(cart).length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
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
            <button className="w-full mt-4 bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 rounded-lg transition-all">Checkout Now</button>
          </div>
        )}
      </div>
    </div>
  )
}
