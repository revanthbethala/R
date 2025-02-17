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
import Dashboard from "./pages/Dashboard";
import JobDetails from "./Jobs/JobDetails";
import ProtectedRoute from "./pages/ProtectedRoute";
import InstructorForm from "./Instructor/InstructorForm";
import AddCourse from "./admin/course/AddCourse";
import EditCourse from "./admin/course/EditCourse";
import InstructorDashboard from "./Instructor/InstructorDashboard";
import RecruiterDashboard from "./Recruiter/RecruiterDashboard";
import CreateLecture from "./admin/lecture/CreateLecture";
import EditLecture from "./admin/lecture/EditLecture";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css";
import Resume from "./pages/Resume";
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
          path: "resume-builder",
          element: <Resume />,
        },
        {
          path: "assessments",
          element: (
            <ProtectedRoute>
              <Assessments />
            </ProtectedRoute>
          ),
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
          element: (
            <ProtectedRoute>
              <MockInterview />
            </ProtectedRoute>
          ),
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
              path: "start/:id",
              element: <MockInterviewQuestions />,
            },
          ],
        },
        {
          path: "courses",
          element: (
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          ),
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
          element: (
            <ProtectedRoute>
              <Jobs />
            </ProtectedRoute>
          ),
          children: [
            {
              path: "",
              element: <JobCards />,
            },
            {
              path: "job-detail/:id",
              element: <JobDetails />,
            },
          ],
        },
        {
          path: "dashboard",
          element: (
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          ),
        },

        {
          path: "/compiler",
          element: (
            <ProtectedRoute>
              <Compiler />
            </ProtectedRoute>
          ),
        },
        {
          path: "instructor",
          children: [
            {
              path: "",
              element: <InstructorForm />,
            },
            {
              path: "dashboard",
              element: <InstructorDashboard />,
            },
            {
              path: "addCourse",
              element: <AddCourse />,
            },
            {
              path: "course/:id",
              element: <EditCourse />,
            },
            {
              path: "course/:id/lecture",
              element: <CreateLecture />,
            },
            {
              path: "course/:id/lecture/:lectureId",
              element: <EditLecture />,
            },
          ],
        },
        {
          path: "recruiter",
          children: [{ path: "dashboard", element: <RecruiterDashboard /> }],
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
      <ToastContainer />
    </Suspense>
  );
}

export default App;
