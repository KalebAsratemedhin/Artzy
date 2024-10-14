'use client'
import { getToken } from "@/server/actions/auth"
import Link from "next/link"

const Header = () => {

  const isAuth = getToken()
  return (
    <header className="flex justify-between px-3 items-center h-16 w-full shadow-md">
        <p className="text-emerald-400 text-lg font-bold ">Artzy</p>

        <nav>
          <ul className="flex gap-4">
            <li className="text-emerald-500 hover:underline hover:underline-offset-8 "><Link href={'/posts'}>Posts</Link></li>
            <li className="text-emerald-500 hover:underline hover:underline-offset-8 "><Link href={'/discover'}>Discover</Link></li>
            <li className="text-emerald-500 hover:underline hover:underline-offset-8 "><Link href={'/chat'}>Chat</Link></li>
            <li className="text-emerald-500 hover:underline hover:underline-offset-8 "><Link href={'/chat'}>Cart</Link></li>


          </ul>
        </nav>

        {!isAuth ? 
            <div className="flex gap-4">
                <Link className="text-emerald-500 bg-white px-2 py-1 border hover:bg-emerald-500 hover:text-white border-emerald-500 rounded-lg" href={'/auth/signup'} >signup </Link>
                <Link className="text-emerald-500 bg-white px-2 py-1 border hover:bg-emerald-500 hover:text-white border-emerald-500 rounded-lg" href={'/auth/signin'} >signin </Link>

            </div> : <div onClick={() => {}} className="w-12 h-12 rounded-full bg-gray-500"></div>
        }
    </header>
  )
}

export default Header