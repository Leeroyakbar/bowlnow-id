import { useNavigate } from "react-router-dom"

export default function Guest({ setIsLoginView }) {
  const navigate = useNavigate()

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Guest Customer</h2>
      <p className="mb-4">Anda belum login. Silahkan login terlebih dahulu.</p>
      <button className="bg-yellow-400 text-white px-4 py-2 rounded-md" onClick={() => navigate("/auth")}>
        Masuk
      </button>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded-md ml-2"
        onClick={() => {
          setIsLoginView(false)
          navigate("/auth")
        }}
      >
        Daftar
      </button>
    </>
  )
}
