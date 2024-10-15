
import { getUserFromToken } from "@/server/actions/user"
import Link from "next/link"
import { MdPerson } from "react-icons/md";

import { IoIosNotifications } from "react-icons/io";
import Navbar from "./Navbar";



const Header = async () => {
  const user = await getUserFromToken()
  

  return (
    <header className="flex justify-between px-3 items-center h-16 w-full shadow-md">
        <p className="text-emerald-400 text-lg font-bold ">Artzy</p>

          <Navbar />
        

         {!user ? 
            <div className="flex gap-4">
                <Link className="text-emerald-500 bg-white px-2 py-1 border hover:bg-emerald-500 hover:text-white border-emerald-500 rounded-lg" href={'/auth/signup'} >signup </Link>
                <Link className="text-emerald-500 bg-white px-2 py-1 border hover:bg-emerald-500 hover:text-white border-emerald-500 rounded-lg" href={'/auth/signin'} >signin </Link>

            </div> : 
            <div className="flex gap-4 items-center">
                <IoIosNotifications className='w-10 h-10' />
                <Link href="/profile" className="w-12 h-12 rounded-full bg-gray-100 flex justify-center items-center text-2xl"><MdPerson className="h-9 w-9" /></Link>

              
            </div>
        } 
    </header>
  )
}

export default Header