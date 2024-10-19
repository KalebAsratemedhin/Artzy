import { getPosts } from '@/server/actions/post'
import PostCard from './PostCard'

const Posts =  async () => {
  const response = await getPosts()

  if(response.error){
    return (
      <div>
        <p>Error loading posts: {response.message}</p>
      </div>
    )

  }


  return (
    <div className='flex gap-2 mt-2'>

      { response.posts && response.posts.map((post) => {
          return (
            <PostCard key={post.id} post={post} />
          )
        })
      }
     
    </div>
  )
}

export default Posts