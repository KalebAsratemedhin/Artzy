'use client'
import FileUpload from "@/app/components/Shared/Fileupload"
import SuccessMessage from "@/app/components/Shared/SuccessMessage";
import TextField from '@/app/components/Shared/TextField';
import { createPost } from '@/server/actions/post';
import { useState } from "react";


export default function CreatePostForm() {
  const [errors, setErrors] = useState<Record<string, string >>({})
  const [successMessage, setSuccessMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrors({})
    const formData = new FormData(e.currentTarget)
    const response = await createPost(formData)

    console.log('response', response)
    if(response.errors){
      setErrors(response.errors)
    }
    if(response.success){
      setSuccessMessage('Post created successfully.')

    }


  };

  return (
    <div>
      <form onSubmit={handleSubmit} className=" p-20 w-1/2 mx-auto flex flex-col gap-2 pt-12">

        <TextField type="text" title="Title" id="title" error={errors.title} />
        <TextField type="text" title="Price" id="price" error={errors.price} />
        <div>
          <label className='block text-gray-600' htmlFor="description">Description</label>
          <textarea name="description" className={`border border-gray-300 h-10 w-full rounded-md hover:border-emerald-400 focus:ring-2 focus:outline-none focus:ring-emerald-600 p-2 ${errors.description ? 'border-red-500' : ''}`}   maxLength={150} />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          
        </div>

        <FileUpload error={errors.files} /> 
        <SuccessMessage successMessage={successMessage} clearSuccessMessage={() => setSuccessMessage('')} />

        <button type="submit" className="text-white flex gap-2 items-center bg-emerald-600 rounded-md shadow-sm hover:shadow-md px-2 py-1">Create Post</button>
      </form>

    </div>
  );
}
