import { Button } from "@/components/ui/button";
import MyLearning from "@/Courses/MyLearning";
import useGet from "@/myComponents/useGet";
import { NavLink } from "react-router";

function Dashboard() {
  const { data, isLoading, error } = useGet("courses/published");
  console.log(data, isLoading, error);

  return (
    <div className="p-5">
      <NavLink to="/course/create">
        <Button variant={"default"} className="bg-blue-600 hover:bg-blue-800">
          Create Course
        </Button>
      </NavLink>
    </div>
  );
}

export default Dashboard;
