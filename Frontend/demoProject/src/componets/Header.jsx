import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../reducers/authenticationSlice";
import { toast } from "react-toastify";

const Header = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("you have been logout");
    navigate("/login");
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gray-800 sticky top-0 z-50">
      <nav className="container mx-auto p-4 flex justify-between items-center">
        <div className="text-white text-xl font-semibold">Cromwell</div>
        <div className="hidden md:flex space-x-4">
          <NavLink to="/" className="text-white hover:text-gray-300">
            Home
          </NavLink>
          {!isAuthenticated ? (
            <>
              <NavLink to="/login" className="text-white hover:text-gray-300">
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="text-white hover:text-gray-300"
              >
                Register
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/protect/landingpage"
                className="text-white hover:text-gray-300"
              >
                Landing Page
              </NavLink>
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-300"
              >
                Logout
              </button>
            </>
          )}
        </div>
        {!isMenuOpen ? (
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        ) : (
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}

        {isMenuOpen && (
          <div className="md:hidden bg-gray-700 text-white p-4 ">
            <NavLink to="/" className="block py-2 hover:text-gray-300">
              Home
            </NavLink>
            {!isAuthenticated ? (
              <>
                <NavLink to="/login" className="block py-2 hover:text-gray-300">
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="block py-2 hover:text-gray-300"
                >
                  Register
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/protect/landingpage"
                  className="text-white hover:text-gray-300"
                >
                  Landing Page
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-gray-300"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
