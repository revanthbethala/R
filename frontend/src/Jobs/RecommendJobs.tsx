import useGet from "@/myComponents/useGet"
import { useUser } from "@clerk/clerk-react"

const RecommendJobs = () => {
   const { user } = useUser()
   const id = user?.id
   const { data, error, isLoading } = useGet(`user/getUserByClerk/${id}`)
   console.log(data)
   const courseIds = data?.user?.courses
   console.log(courseIds[0])

   return (
      <div>RecommendJobs</div>
   )
}

export default RecommendJobs