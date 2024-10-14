import { getUserFromToken } from "@/server/actions/user"

const page = async () => {
  const user = await getUserFromToken()
  console.log('user', user)

 
    
  return (
    <div>
        
        <p>Dashboard</p>




    </div>

  )
}

export default page