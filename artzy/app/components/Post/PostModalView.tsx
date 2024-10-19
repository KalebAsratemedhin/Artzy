import { Post } from '@prisma/client'
import React from 'react'
import ImageSlider from '../Shared/ImageSlider'
import { PopulatedPost } from '@/types/post'
import Link from 'next/link'

const PostModalView = ({post} : {post: PopulatedPost}) => {
  return (
    <div className='flex w-full'>
        <div className='p-5 w-1/2'>
            <ImageSlider images={post.picUrls} />
           
        </div> 
        <div className='border-l border-l-gray-600 flex-grow p-2 flex flex-col gap-4'>
           <div>
            <h1 className='text-xl font-bold '>{post.title}</h1>
            <p className='text-gray-600 text-sm mb-2'>By {post.author.fullName}</p>
            <p className='text-gray-500'>
              {post.description.length > 100 ? post.description.slice(0, 100) : post.description}
              <Link className=' ml-2 underline hover:text-emerald-500 text-emerald-400' href={`/discover/${post.id}`}>more</Link>
            </p>
            
            

           </div>

           <div>
            <h1 className='text-xl font-bold text-gray-600'>Comments</h1>
                <div className='bg-gray-100 h-full p-2'>
                    <p>Nice Worl</p>
                </div>
           </div>

        </div>
    </div>
  )
}

export default PostModalView