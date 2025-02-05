import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Loading from "./pages/Loading";
import NavBar from "./myComponents/NavBar";
const ProtectedRoute = lazy(() => import("./pages/ProtectedRoute"));
const Resume = lazy(() => import("./pages/Resume"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
import Certificate from "./myComponents/Certificate";
import MockInterviewForm from "./MockInterviews/MockInterviewForm";
import MockInterview from "./MockInterviews/MockInterview";
import MockInterviewInstructions from "./MockInterviews/MockInterviewInstructions";
import CourseDetails from "./Courses/CourseDetails";
import Course from "./Courses/Course";
import CourseProgress from "./Courses/CourseProgress";
import CreateLecture from "./admin/lecture/CreateLecture";
import EditLecture from "./admin/lecture/EditLecture";
import AddCourse from "./admin/course/AddCourse";
import EditCourse from "./admin/course/EditCourse";
import AssessmentForm from "./Assesments/AssesmentForm";
import AssesmentInstructions from "./Assesments/AssesmentInstructions";
import CourseTab from "./admin/course/CourseTab";
import Dashboard from "./pages/Dashboard";
const Assesment = lazy(() => import("./Assesments/Assesment"));
const UserPreferences = lazy(() => import("./pages/UserPreferences"));
const Compiler = lazy(() => import("./pages/Compiler"));
import Home from "./pages/Home";

// Layout Component for Pages with NavBar
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
      element: <Layout />, // Ensure NavBar wraps child routes properly
      children: [
        { path: "", element: <Home /> },
        {
          path: "course",
          element: (
            <ProtectedRoute>
              <Course />
            </ProtectedRoute>
          ),
        },
        {
          path: "course/search",
          element: (
            <ProtectedRoute>
              <CourseTab />
            </ProtectedRoute>
          ),
        },
        {
          path: "course-detail/:id",
          element: (
            <ProtectedRoute>
              <CourseDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "course-progress/:courseId",
          element: (
            <ProtectedRoute>
              <CourseProgress />
            </ProtectedRoute>
          ),
        },
        {
          path: "dashboard",
          element: (
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          ),
        },
        { path: "course/create", element: <AddCourse /> },
        { path: "course/:courseId", element: <EditCourse /> },
        { path: "course/:courseId/lecture", element: <CreateLecture /> },
        {
          path: "course/:courseId/lecture/:lectureId",
          element: <EditLecture />,
        },

        {
          path: "tests",
          element: (
            <ProtectedRoute>
              <AssessmentForm />
            </ProtectedRoute>
          ),
        },
        {
          path: "tests/instructions",
          element: (
            <ProtectedRoute>
              <AssesmentInstructions />
            </ProtectedRoute>
          ),
        },
        {
          path: "tests/start/:id",
          element: (
            <ProtectedRoute>
              <Assesment />
            </ProtectedRoute>
          ),
        },
        {
          path: "mockinterview",
          element: (
            <ProtectedRoute>
              <MockInterviewForm />
            </ProtectedRoute>
          ),
        },
        {
          path: "mockinterview/instructions",
          element: (
            <ProtectedRoute>
              <MockInterviewInstructions />
            </ProtectedRoute>
          ),
        },
        {
          path: "mockinterview/start/:id",
          element: (
            <ProtectedRoute>
              <MockInterview />
            </ProtectedRoute>
          ),
        },
        { path: "compiler", element: <Compiler /> },
        { path: "resume-builder", element: <Resume /> },
        {
          path: "user-preferences",
          element: (
            <ProtectedRoute>
              <UserPreferences />
            </ProtectedRoute>
          ),
        },
        { path: "certificate", element: <Certificate /> },
      ],
    },
    { path: "login", element: <Login /> },
    { path: "signup", element: <Signup /> },
  ]);

  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
