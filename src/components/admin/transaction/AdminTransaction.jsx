import { Eye } from "lucide-react"
import { X } from "lucide-react"
import { Check } from "lucide-react"

export default function AdminTransaction({ transactions, setTransactions }) {
  const updateTransactionStatus = (id, status) => {
    setTransactions(transactions.map((t) => (t.id === id ? { ...t, status } : t)))
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Manajemen Transaksi</h2>

      <div className="bg-white rounded-lg shadow-sm ">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{transaction.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.customer}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{transaction.items}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Rp {transaction.total.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>{transaction.date}</div>
                    <div className="text-xs">{transaction.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${transaction.status === "completed" ? "bg-green-100 text-green-800" : transaction.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {transaction.status === "pending" && (
                      <div className="flex space-x-2">
                        <button onClick={() => updateTransactionStatus(transaction.id, "completed")} className="text-green-600 hover:text-green-900" title="Approve">
                          <Check size={16} />
                        </button>
                        <button onClick={() => updateTransactionStatus(transaction.id, "cancelled")} className="text-red-600 hover:text-red-900" title="Cancel">
                          <X size={16} />
                        </button>
                      </div>
                    )}
                    <button className="text-blue-600 hover:text-blue-900 ml-2" title="View Details">
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
