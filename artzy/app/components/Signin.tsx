'use client'
import TextField from "./TextField"
import { signin } from "@/server/actions/auth"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import ErrorMessage from "./ErrorMessage"

const Signin = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>()
  const router = useRouter()



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const res = await signin(formData);

    if(res.success){
        router.push('/profile')
    }

    if (res.errors ) {
      setErrors(res.errors );
    } 
    if (res.error){
      setError(res.error)
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-4 font-poppins">
        

        <div className="w-full sm:w-3/4 h-3/4 md:flex shadow-lg   rounded-lg ">
            <div className="md:w-1/2 background-image py-5 md:rounded-l-lg"> 
                <h1 className="text-4xl text-start ml-6  my-6 font-bold">Join us at Artzy</h1>
                <p className="text-xl text-start mx-6 text-wrap">Where you can find Africa's Endigenous Art Pieces and get in touch with the creators</p>


                <p className="mt-16 text-xl text-start mx-6 text-wrap">Get connected with artists, discover and purchase art.</p>

               
            </div> 
            <div className="md:w-1/2 flex-grow flex flex-col justify-center px-8 py-16 bg-white md:rounded-r-lg ">
                <div >
                    <h1 className="text-emerald-500 text-4xl font-bold text-center">Welcome back! </h1>
                    <h1 className="text-emerald-300 text-4xl mt-2 font-bold text-center">Signin</h1>
                </div>

                <form onSubmit={handleSubmit} >
                    <div className="flex flex-col gap-2 pt-12">
                        <TextField type="text" title="Email" id="email" error={errors.email} />
                        <TextField type="password" title="Password" id="password" error={errors.password} />

                    </div>

                    <ErrorMessage  error={error!} clearError={(err) => setError(err)} />
                    

                    <button type="submit" className="bg-emerald-500 font-medium w-full mt-10 py-2 rounded-md text-white text-xl hover:shadow-lg ">Signin</button>
                    <p className="text-gray-500 mt-4">Don't have an account? <Link href='/auth/signup' className="text-emerald-500 hover:text-emerald-700">Signup</Link></p>
                    <p className="text-gray-500 mt-8">By signing in you accept our terms of service and privacy policy. <Link href='/privacy' className="text-emerald-500 hover:text-emerald-700">Privacy policy</Link>  <Link href='/terms' className="text-emerald-500 hover:text-emerald-700">terms of service</Link></p>


                </form>
            </div>
        </div> 
                              

    </div>
  )                                       
}

export default Signin