import { Home } from "lucide-react"
import FoodDashboard from "../Food/FoodDasboard"
import UserDasboard from "../user/UserDashboard"
import { Users } from "lucide-react"
import { UtensilsCrossed } from "lucide-react"
import { Tag } from "lucide-react"
import { Receipt } from "lucide-react"
import NavItem from "../common/NavItem"

export default function AdminSidebar({ activeSection, setActiveSection }) {
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-8">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <nav className="space-y-2">
              <NavItem icon={Home} label="Dashboard" section="dashboard" active={activeSection === "dashboard"} setActiveSection={setActiveSection} />
              <NavItem icon={Users} label="Users" section="users" active={activeSection === "users"} setActiveSection={setActiveSection} />
              <NavItem icon={UtensilsCrossed} label="Makanan" section="foods" active={activeSection === "foods"} setActiveSection={setActiveSection} />
              <NavItem icon={Tag} label="Kategori" section="categories" active={activeSection === "categories"} setActiveSection={setActiveSection} />
              <NavItem icon={Receipt} label="Transaksi" section="transactions" active={activeSection === "transactions"} setActiveSection={setActiveSection} />
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}
