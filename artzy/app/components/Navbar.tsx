'use client'

import { TbShoppingCart } from "react-icons/tb";
import { BsChatSquareDots } from "react-icons/bs";
import { GiPalette } from "react-icons/gi";
import { IoImagesOutline } from "react-icons/io5";
import Link from "next/link"
import { usePathname } from "next/navigation";


const Navbar = () => {
    const pathname = usePathname()
  return (
    <nav>
        <ul className="flex gap-8">
            <li className={`text-emerald-500 hover:underline hover:underline-offset-8 px-2 rounded-sm ${pathname == '/forYou' ? 'underline underline-offset-8' : '' }`}><Link href={'/forYou'} className="flex items-center gap-2"> <IoImagesOutline className="text-emerald-700" /> For You</Link></li>
            <li className={`text-emerald-500 hover:underline hover:underline-offset-8 px-2 rounded-sm ${pathname == '/discover' ? 'underline underline-offset-8' : '' }`}><Link href={'/discover'} className="flex items-center gap-2"> <GiPalette className="text-emerald-700" /> Discover </Link></li>
            <li className={`text-emerald-500 hover:underline hover:underline-offset-8 px-2 rounded-sm ${pathname == '/chat' ? 'underline underline-offset-8' : '' }`}><Link href={'/chat'} className="flex items-center gap-2"><BsChatSquareDots  className="text-emerald-700"/> Chat </Link></li>
            <li className={`text-emerald-500 hover:underline hover:underline-offset-8 px-2 rounded-sm ${pathname == '/cart' ? 'underline underline-offset-8' : '' }`}><Link href={'/cart'} className="flex items-center gap-2"><TbShoppingCart className="text-emerald-700" /> Cart</Link></li>
        </ul>
    </nav>
  )
}

export default Navbar
