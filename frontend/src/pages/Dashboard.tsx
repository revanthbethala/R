import MyLearning from "@/Courses/MyLearning";
import useGet from "@/myComponents/useGet";

function Dashboard() {
  const { data, isLoading, error } = useGet("courses/published");
  console.log(data,isLoading,error);
  const handleGetCourses = () => {
    if (error) {
      console.log(error);
    }
    if (isLoading) {
      console.log("Loading...");
    }
    if (data) {
      console.log(data);
    }
  };

  return (
    <div>
      <MyLearning />
      <button onClick={handleGetCourses}>get courses</button>
    </div>
  );
}

export default Dashboard;
