import React, { useEffect, useState } from "react";
import useFetchUserDetails from "../customeHooks/useFetchUserDetails";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const { user } = useFetchUserDetails();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  console.log(userData)

  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);

  // console.log(user)

  return (
    
    <div className="landing-page min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col justify-center items-center text-white">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold mb-6">Welcome Back</h1>

        {userData ? (
          <div className="bg-white text-black p-6 rounded-lg shadow-lg max-w-md mx-auto">
            <p className="text-lg font-semibold">
              Hello, <span className="text-blue-600">{userData?.username}</span>
              !
            </p>
            <p className="text-sm text-gray-700 mt-2">
              Your email: <span className="font-medium">{userData?.email}</span>
            </p>
          </div>
        ) : (
          <div className="bg-white text-black p-6 rounded-lg shadow-lg max-w-md mx-auto">
            <p className="text-lg font-semibold mb-2">You are not logged in.</p>
            <p className="text-sm text-gray-700 mb-4">
              Please login or register to continue.
            </p>
            <div className="flex space-x-4">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
