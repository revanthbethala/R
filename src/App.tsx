import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import NavBar from "./myComponents/NavBar";
import Loading from "./pages/Loading";
const ProtectedRoute = lazy(() => import("./pages/ProtectedRoute"));
const Resume = lazy(() => import("./pages/Resume"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
import Certificate from "./myComponents/Certificate";
import MockInterviewForm from "./myComponents/MockInterviewForm";
import MockInterviewInstructions from "./myComponents/MockInterviewInstructions";
import CourseDetails from "./Courses/CourseDetails";
import Course from "./Courses/Course";
import CourseProgress from "./Courses/CourseProgress";
import SearchPage from "./Courses/SearchPage";
import Dashboard from "./pages/Dashboard";
import CreateLecture from "./admin/lecture/CreateLecture";
import EditLecture from "./admin/lecture/EditLecture";
import AddCourse from "./admin/course/AddCourse";
import EditCourse from "./admin/course/EditCourse";
import AssessmentForm from "./Assesments/AssesmentForm";
import AssesmentInstructions from "./Assesments/AssesmentInstructions";
const Home = lazy(() => import("./pages/Home"));
const Assesment = lazy(() => import("./pages/Assesment"));
const MockInterviews = lazy(() => import("./pages/MockInterviews"));
const UserPreferences = lazy(() => import("./pages/UserPreferences"));
const Jobs = lazy(() => import("./pages/Jobs"));
const Compiler = lazy(() => import("./pages/Compiler"));
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <NavBar />,
      children: [
        {
          path: "/",
          element: <Home />,
        },

        {
          path: "courses",
          element: (
            <ProtectedRoute>
              <Course />
            </ProtectedRoute>
          ),
        },
        {
          path: "courses/search",
          element: (
            <ProtectedRoute>
              <SearchPage />
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
          path: "/dashboard",
          element: (
            <ProtectedRoute>
              <Dashboard />
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
          path: "/admin",
          children: [
            {
              path: "dashboard",
              element: <Dashboard />,
            },
            {
              path: "course/create",
              element: <AddCourse />,
            },
            {
              path: "course/:courseId",
              element: <EditCourse />,
            },
            {
              path: "course/:courseId/lecture",
              element: <CreateLecture />,
            },
            {
              path: "course/:courseId/lecture/:lectureId",
              element: <EditLecture />,
            },
          ],
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
          path: "mockinterview/start",
          element: (
            <ProtectedRoute>
              <MockInterviews />
            </ProtectedRoute>
          ),
        },

        {
          path: "jobs",
          element: (
            <ProtectedRoute>
              <Jobs />
            </ProtectedRoute>
          ),
        },
        {
          path: "compiler",
          element: <Compiler />,
        },
        {
          path: "resume-builder",
          element: <Resume />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/user-preferences",
      element: (
        <ProtectedRoute>
          <UserPreferences />
        </ProtectedRoute>
      ),
    },
    {
      path: "/certificate",
      element: <Certificate />,
    },
  ]);
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
