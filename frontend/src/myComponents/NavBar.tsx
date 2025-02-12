import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { UserButton, useUser } from "@clerk/clerk-react";
function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
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
            <NavLink to="courses">
              <li className="li-style">Courses</li>
            </NavLink>
            <NavLink to="assessments">
              <li className="li-style">Assessment</li>
            </NavLink>
            <NavLink to="mockInterview">
              <li className="li-style">Mock Interviews</li>
            </NavLink>
            <NavLink to="compiler">
              <li className="li-style">Compiler</li>
            </NavLink>
          </ul>

          {/* Sign Up/Sign In Buttons */}
          <div className="hidden md:flex  space-x-4 ">
            <button
              onClick={() =>
                isSignedIn ? navigate("/dashboard") : navigate("/signup")
              }
              className={`${
                isSignedIn
                  ? "font-semibold text-lg font-Inter cursor-pointer  p-2"
                  : "bg-blue-700 text-white   font-semibold px-4 py-2  w-fit text-lg rounded-lg"
              }  font-family-poppins `}
            >
              {isSignedIn ? "Dashboard" : "Login/Sign Up"}
            </button>
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
            <NavLink to="compiler" onClick={() => setIsMobileMenuOpen(false)}>
              <li className="li-style">Compiler</li>
            </NavLink>
            <div className="flex flex-col items-start ">
              <button
                onClick={() =>
                  isSignedIn ? navigate("/dashboard") : navigate("/signup")
                }
                className={`${
                  isSignedIn
                    ? "font-semibold text-lg font-Inter cursor-pointer  p-2"
                    : "bg-blue-700 text-white   font-semibold px-4 py-2  w-fit text-lg rounded-lg"
                }  font-family-poppins `}
              >
                {isSignedIn ? "Dashboard" : "Login/Sign Up"}
              </button>
            </div>
          </ul>
        )}
      </header>
    </div>
  );
}

export default NavBar;
