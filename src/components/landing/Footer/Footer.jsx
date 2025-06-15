import { InstagramIcon } from "lucide-react"
import { Mail, MapPin, Phone, Instagram } from "lucide-react"
import { AiOutlineTikTok } from "react-icons/ai"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-12">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Lili's Kitchen</h2>
          <p className="text-sm text-gray-400">Your go-to place for delicious food made with love and served with speed. Order now and enjoy every bite!</p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-yellow-400">Contact Us</h3>
          <ul className="text-sm space-y-2 text-gray-300">
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-yellow-400" />
              Jl. Kenangan No.123, Bandung
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-yellow-400" />
              +62 822-7336-6718
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-yellow-400" />
              lilirhm.yani@gmail.com
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-yellow-400">Follow Us</h3>
          <div className="flex gap-4 ">
            <a href="https://instagram.com/liliskitchen" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition">
              <InstagramIcon className="w-5 h-5" />
            </a>
            {/* <a href="https://tiktok.com/@liliskitchen" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition">
              <Tiktok className="w-5 h-5" />
            </a> */}
            <a href="https://tiktok.com/@liliskitchen" target="_blank" rel="noopener noreferrer" className="w-4 h-4 hover:text-yellow-400 transition"></a>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-gray-500">&copy; {new Date().getFullYear()} Lili's Kitchen. All rights reserved.</div>
    </footer>
  )
}
