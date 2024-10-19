import Bookmarks from "@/app/components/Bookmarks/Bookmarks"
import Likes from "@/app/components/Likes/Likes"
import Posts from "@/app/components/Post/index"
import TabSelector from "@/app/components/Shared/TabSelector"
import { getPosts } from "@/server/actions/post"
import { getUserFromToken } from "@/server/actions/user"

const page = async () => {
  const user = await getUserFromToken()
  const initials = user?.fullName.split(" ").map((part) => {
    return part ? part[0].toUpperCase() : "" 
  })

  return (
    <div className="p-16">
        <div>
          <p className="text-xl font-bold mb-8 ">Welcome, <span className="italic text-emerald-500">{user?.fullName}</span></p>
        </div>

        <div className="flex gap-4 border border-gray-300 h-40 items-center  rounded-md">
          <div className="w-40 flex justify-end" >
            <p className="w-20 h-20 flex justify-center items-center text-4xl bg-gray-300 rounded-full ">
            {initials}
            </p>
          </div>
          <div className="flex-grow">
            <p>{user?.fullName}</p>
            <p>@{user.username}</p>
            <p>0 {user.followers} Followers | 0 Following</p>



          </div>
          <div className="flex flex-col gap-2 mr-52 items-start">
            <button className="text-white bg-emerald-600 rounded-md shadow-sm hover:shadow-md px-2 py-1">Report</button>
            <button className="text-white bg-emerald-600 rounded-md shadow-sm hover:shadow-md px-2 py-1">Block</button>

          </div>
        </div>

        <div>
          <TabSelector tabs={['Posts', 'Likes', 'Bookmarks']} contents={[<Posts />, <Likes />, <Bookmarks />]}  />
        </div>
    </div>
  )
}

export default page