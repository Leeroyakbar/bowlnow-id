import { LogOut } from "lucide-react"
import { UtensilsCrossed } from "lucide-react"
import { User } from "lucide-react"

export default function AdminHeader({ setActiveSection, handleLogout, user }) {
  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <UtensilsCrossed className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-xl font-bold text-gray-800">Food Ordering Admin</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => setActiveSection("profile")} className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 cursor-pointer">
              {user.photoUrl ? (
                <>
                  <img src={user.photoUrl} alt="profile" className="w-8 h-8 rounded-full object-cover" />
                  <span>{user.fullName}</span>
                </>
              ) : (
                <>
                  <User size={20} />
                  <span>Profile</span>
                </>
              )}
            </button>

            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 cursor-pointer" onClick={handleLogout}>
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
