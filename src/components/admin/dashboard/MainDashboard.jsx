import { ShoppingCart } from "lucide-react"
import { TrendingUp } from "lucide-react"
import { UtensilsCrossed } from "lucide-react"
import { Users } from "lucide-react"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export default function MainDashboard({ users, foods, transactions, salesData }) {
  const todayTransactions = transactions.filter((t) => t.date === "2024-06-21")
  const todayTotal = todayTransactions.reduce((sum, t) => sum + t.total, 0)

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-800">{users.length}</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Menu Items</p>
              <p className="text-2xl font-bold text-gray-800">{foods.length}</p>
            </div>
            <UtensilsCrossed className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Transaksi Hari Ini</p>
              <p className="text-2xl font-bold text-gray-800">{todayTransactions.length}</p>
            </div>
            <ShoppingCart className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Penjualan Hari Ini</p>
              <p className="text-2xl font-bold text-gray-800">Rp {todayTotal.toLocaleString()}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm ">
          <h3 className="text-lg font-semibold mb-4">Grafik Penjualan (5 Hari Terakhir)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis tickFormatter={(value) => `${value / 1000}k`} />
              <Tooltip formatter={(value) => [`Rp ${value.toLocaleString()}`, "Penjualan"]} />
              <Line type="monotone" dataKey="sales" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Riwayat Transaksi Terbaru</h3>
          <div className="space-y-3">
            {transactions.slice(0, 5).map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{transaction.customer}</p>
                  <p className="text-sm text-gray-600">{transaction.items}</p>
                  <p className="text-xs text-gray-500">
                    {transaction.date} {transaction.time}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">Rp {transaction.total.toLocaleString()}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${transaction.status === "completed" ? "bg-green-100 text-green-800" : transaction.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}>
                    {transaction.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
