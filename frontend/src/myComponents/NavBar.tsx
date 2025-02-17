import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(
    localStorage.getItem("role")
  );
  const { user } = useUser();
  const userId = user?.id;
  const instructorFirstVisit = localStorage.getItem("instructorFirstVisit");
  const handleRoleChange = async (event) => {
    const role: string = event.target.value;
    setSelectedRole(role);
    localStorage.setItem("role", role);
    if (role === "instructor") {
      if (instructorFirstVisit === "true") navigate("/instructor/addCourse");
      else navigate("/instructor");
    }
    if (role === "student") navigate("/");
    if (role === "recruiter") navigate("/jobs");
    const req = await axios.put(
      "http://localhost:8000/api/v1/user/changeRole",
      JSON.stringify({ role: event.target.value, userId }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(req);
  };
  return (
    <div className="">
      <header className="items-center">
        <nav className="flex flex-row justify-between items-center px-4 ">
          <Logo size={"2xl"} />

          {/* Desktop Navigation */}
          <ul className="hidden md:flex gap-4 items-center">
            <NavLink to="">
              <li className="li-style">Home</li>
            </NavLink>
            <NavLink to="assessments">
              <li className="li-style">Assesments</li>
            </NavLink>
            <NavLink to="courses">
              <li className="li-style">Courses</li>
            </NavLink>

            <NavLink to="mockInterview">
              <li className="li-style">Mock Interviews</li>
            </NavLink>
            <NavLink to="jobs">
              <li className="li-style">Jobs</li>
            </NavLink>
            <NavLink to="compiler">
              <li className="li-style">Compiler</li>
            </NavLink>
            <NavLink to="resume-builder">
              <li className="li-style">Resume Builder</li>
            </NavLink>
          </ul>

          {/* Sign Up/Sign In Buttons */}
          <div className="hidden md:flex md:  space-x-4 ">
            <div className="md:flex gap-4">
              {isSignedIn && <NavLink
                to={
                  selectedRole === "instructor"
                    ? `/instructor/dashboard`
                    : selectedRole === "recruiter"
                      ? "/recruiter/dashboard"
                      : "dashboard"
                }
              >
                <Button className="px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600">
                  My Dashboard
                </Button>
              </NavLink>}
              {!isSignedIn && (
                <Button onClick={() => navigate("/signup")} className="bg-blue-700 font-semibold font-Inter tracking-wide hover:bg-blue-800">
                  Login/Sign Up
                </Button>
              )}
            </div>

            {isSignedIn && (
              <select
                className="font-semibold font-Inter cursor-pointer"
                onChange={handleRoleChange}
              >
                <option value="" className="text-base ">
                  Switch Roles
                </option>
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
                <option value="recruiter">Recruiter</option>
              </select>
            )}

            {isSignedIn && <UserButton />}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex gap-5 flex-row-reverse justify-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              className="text-gray-800"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            {isSignedIn && <UserButton />}
          </div>
        </nav>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <ul className="flex flex-col gap-3 p-4 bg-gray-50 shadow-md md:hidden">
            <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>
              <li className="li-style">Home</li>
            </NavLink>
            <NavLink to="courses" onClick={() => setIsMobileMenuOpen(false)}>
              <li className="li-style">Courses</li>
            </NavLink>
            <NavLink to="tests" onClick={() => setIsMobileMenuOpen(false)}>
              <li className="li-style">Assessment</li>
            </NavLink>
            <NavLink
              to="mockInterview"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <li className="li-style">Mock Interviews</li>
            </NavLink>
            <NavLink to="jobs" onClick={() => setIsMobileMenuOpen(false)}>
              <li className="li-style">Jobs</li>
            </NavLink>
            <NavLink to="compiler" onClick={() => setIsMobileMenuOpen(false)}>
              <li className="li-style">Compiler</li>
            </NavLink>

            <div className="flex flex-col items-start ">
              <button
                onClick={() =>
                  isSignedIn ? navigate("/dashboard") : navigate("/signup")
                }
                className={`${isSignedIn
                    ? "font-semibold text-lg font-Inter cursor-pointer  p-2"
                    : "bg-blue-700 text-white   font-semibold px-4 py-2  w-fit text-lg rounded-lg"
                  }  font-family-poppins `}
              >
                {isSignedIn ? "Dashboard" : "Login/Sign Up"}
              </button>
              {isSignedIn && (
                <select className="font-semibold font-Inter cursor-pointer mt-4">
                  <option value="" className="text-base w-screen ">
                    Switch Roles
                  </option>
                  <option value="student">Student</option>
                  <option value="instructor">Instructor</option>
                  <option value="recruiter">Recruiter</option>
                </select>
              )}
            </div>
          </ul>
        )}
      </header>
    </div>
  );
}

export default NavBar;
