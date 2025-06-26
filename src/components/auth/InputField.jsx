export default function InputField({ id, type, placeholder, icon, value, onChange }) {
  return (
    <div className="relative">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">{icon}</span>
      <input
        id={id}
        name={id}
        type={type}
        required
        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
