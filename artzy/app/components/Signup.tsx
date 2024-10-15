
'use client';

import { useState } from 'react';
import { signup } from '@/server/actions/auth';
import TextField from './TextField';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Signup = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const res = await signup(formData);

    if(res.success){
        router.push('/profile')
    }

    if (res.errors) {
      setErrors(res.errors);
    } else {
      setErrors({});
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-4 font-poppins">
      <div className="w-full sm:w-3/4 h-3/4 md:flex shadow-lg rounded-lg">
        <div className="md:w-1/2 background-image py-5 md:rounded-l-lg">
          <h1 className="text-4xl text-start ml-6 my-6 font-bold">Join us at Artzy</h1>
          <p className="text-xl text-start mx-6 text-wrap">Where you can find Africa's Indigenous Art Pieces and get in touch with the creators</p>
          <p className="mt-20 text-xl text-start mx-6 text-wrap">Get connected with artists, discover, and purchase art.</p>
        </div>
        <div className="md:w-1/2 flex-grow flex flex-col justify-around px-8 py-16 bg-white md:rounded-r-lg">
          <div className="mb-10">
            <h1 className="text-emerald-500 text-4xl font-bold text-center">Welcome to Artzy!</h1>
            <h1 className="text-emerald-300 text-4xl mt-2 font-bold text-center">Signup</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <TextField type="text" title="Full Name" id="fullName" error={errors.fullName} />
              <TextField type="email" title="Email" id="email" error={errors.email} />
              <TextField type="username" title="Username" id="username" error={errors.username} />
              <TextField type="text" title="Address" id="address" error={errors.address} />
              <TextField type="text" title="Phone Number" id="phoneNumber" error={errors.phoneNumber} />
              <TextField type="password" title="Password" id="password" error={errors.password} />
            </div>

            <button type="submit" className="bg-emerald-500 font-medium w-full mt-10 py-2 rounded-md text-white text-xl hover:shadow-lg">
              Signup
            </button>

            <p className="text-gray-500 text-sm mt-4">
              Have an account? <Link href="/auth/signin" className="text-emerald-500">Signin</Link>
            </p>
            <p className="text-gray-500 text-sm mt-8">
              By signing up you accept our <Link href="/privacy" className="text-emerald-500 hover:text-emerald-700">Privacy policy</Link> and <Link href="/terms" className="text-emerald-500 hover:text-emerald-700">terms of service</Link>.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
