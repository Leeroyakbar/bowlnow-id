export default function NavItem({ icon: Icon, label, section, active, setActiveSection }) {
  return (
    <button onClick={() => setActiveSection(section)} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${active ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}>
      <Icon size={20} />
      <span>{label}</span>
    </button>
  )
}
