import MyLearning from "@/Courses/MyLearning";
import axios from "axios";

function Dashboard() {
  const handleGetCourses = async () => {
    const res = await axios.get(
      `http://localhost:8000/api/v1/courses/published`
    );
    console.log(res.data);
  };
  return (
    <div>
      {/* <MyLearning /> */}
      <button onClick={handleGetCourses}>get courses</button>
    </div>
  );
}

export default Dashboard;
