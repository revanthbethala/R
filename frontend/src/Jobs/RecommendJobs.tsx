import useGet from "@/myComponents/useGet"
import { useUser } from "@clerk/clerk-react"

const RecommendJobs = () => {
   const { id } = useUser()
   const { data, error, isLoading } = useGet(`/user/get/${id}`)
   return (
      <div>RecommendJobs</div>
   )
}

export default RecommendJobs