import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import NavBar from "./myComponents/NavBar";
import Loading from "./pages/Loading";
const ProtectedRoute = lazy(() => import("./pages/ProtectedRoute"));
const Resume = lazy(() => import("./pages/Resume"));
const AssesmentInstructions = lazy(
  () => import("./myComponents/AssesmentInstructions")
);
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const AssessmentForm = lazy(() => import("./myComponents/AssesmentForm"));
import Certificate from "./myComponents/Certificate";
import MockInterviewForm from "./myComponents/MockInterviewForm";
import MockInterviewInstructions from "./myComponents/MockInterviewInstructions";
import CoursesCatalog from "./myComponents/CourseCard";
import CourseDetailsPage from "./myComponents/CourseDetails";
import CourseDetails from "./myComponents/CourseDetails";
import CourseCard from "./myComponents/CourseCard";
const Home = lazy(() => import("./pages/Home"));
const Assesment = lazy(() => import("./pages/Assesment"));
const Courses = lazy(() => import("./pages/Courses"));
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
              <CourseCard />
            </ProtectedRoute>
          ),
        },
        {
          path: "course-detail/:id",
          element: <CourseDetails />,
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
          path: "tests/start",
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
