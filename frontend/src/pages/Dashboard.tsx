import MyLearning from "@/Courses/MyLearning";
import { Outlet } from "react-router";

function Dashboard() {
  return (
    <div>
      <MyLearning />
      <Outlet />
    </div>
  );
}

export default Dashboard;
