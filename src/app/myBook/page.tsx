import MybookingCard from "@/components/booking/MybookingCard"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"


const MyBook =  async() => {
    const session = await auth.api.getSession({
        headers:await headers()
    })
    const user = session?.user
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-booking/${user?.email}`)
    const booking = await res.json()
    
   
  return (
    <div>
        <MybookingCard booking={booking} />
    </div>
  )
}

export default MyBook