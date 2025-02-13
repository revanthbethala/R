import { Suspense } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Loading from "./pages/Loading";
import NavBar from "./myComponents/NavBar";
import Assessments from "./pages/Assessments";
import AssessmentForm from "./Assesments/AssesmentForm";
import AssessmentInstructions from "./Assesments/AssesmentInstructions";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import UserPreferences from "./pages/UserPreferences";
import AssessmentQuestions from "./Assesments/AssesmentQuestions";
import MockInterviewForm from "./MockInterviews/MockInterviewForm";
import MockInterviewInstructions from "./MockInterviews/MockInterviewInstructions";
import MockInterview from "./pages/MockInterview";
import MockInterviewQuestions from "./MockInterviews/MockInterviewQuestions";
import Courses from "./pages/Courses";
import CourseDetails from "./Courses/CourseDetails";
import CourseProgress from "./Courses/CourseProgress";
import Compiler from "./pages/Compiler";
import Course from "./Courses/Course";
import Jobs from "./pages/Jobs";
import JobCards from "./Jobs/JobCards";
import Dashboard from "./admin/Dashboard";

const Layout = () => (
  <>
    <NavBar />
    <Outlet />
  </>
);

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "", element: <Home /> },
        {
          path: "assessments",
          element: <Assessments />,
          children: [
            {
              path: "",
              element: <AssessmentForm />,
            },
            {
              path: "instructions",
              element: <AssessmentInstructions />,
            },
            {
              path: "start/:id",
              element: <AssessmentQuestions />,
            },
          ],
        },
        {
          path: "mockInterview",
          element: <MockInterview />,
          children: [
            {
              path: "",
              element: <MockInterviewForm />,
            },
            {
              path: "instructions",
              element: <MockInterviewInstructions />,
            },
            {
              path: "mockInterview/start",
              element: <MockInterviewQuestions />,
            },
          ],
        },
        {
          path: "courses",
          element: <Courses />,
          children: [
            { path: "", element: <Course /> },
            {
              path: "course-detail/:id",
              element: <CourseDetails />,
            },
            {
              path: "course-progress/:courseId",
              element: <CourseProgress />,
            },
          ],
        },
        {
          path: "jobs",
          element: <Jobs />,
          children: [
            {
              path: "",
              element: <JobCards />,
            },
          ],
        },
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "/compiler",
          element: <Compiler />,
        },
      ],
    },
    { path: "login", element: <Login /> },
    { path: "signup", element: <Signup /> },
    { path: "/user-preferences", element: <UserPreferences /> },
  ]);

  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
