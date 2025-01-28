import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "./LoadingSpinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(
        "https://temp-ofzo.onrender.com/api/v1/auth/login",
        {
          email,
          password,
        }
      );
      toast.success(response?.data?.message || "Login successful!");
      // localStorage.setItem("authToken", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false)
    }
  };

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8">
          <div className="flex w-full max-w-4xl rounded-lg overflow-hidden shadow-xl">
            {/* Left Side: Welcome Text */}
            <div className="w-full md:w-1/2 bg-white p-8 text-green-800 flex flex-col justify-center">
              <h1 className="text-3xl font-bold mb-4 text-center">
                Welcome Back!
              </h1>
              <p className="text-md text-center font-light mb-6">
                Log in to access your account and browse fresh, locally-sourced
                produce directly from farmers.
              </p>

              <form className="space-y-4" onSubmit={handleLogin}>
                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 rounded-lg bg-gray-100 text-green-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium mb-1"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="w-full px-3 py-2 rounded-lg bg-gray-100 text-green-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-2 bg-green-600 rounded-lg text-white font-bold text-md shadow-md hover:shadow-lg hover:bg-green-700 transition duration-300"
                >
                  Login
                </button>
              </form>

              {/* Redirect to Register */}
              <p className="text-sm text-center mt-4">
                Don’t have an account?{" "}
                <button
                  onClick={() => {
                    navigate("/");
                  }}
                  type="button"
                  className="text-green-600 hover:underline transition duration-200"
                >
                  Register
                </button>
              </p>
            </div>

            {/* Right Side: Image */}
            <div className="hidden md:block w-1/2 relative">
              <img
                src="https://images.pexels.com/photos/5677399/pexels-photo-5677399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Farmers Marketplace"
                className="h-full w-full object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <h2 className="text-2xl font-bold mb-2">
                    Fresh and Local Produce
                  </h2>
                  <p className="text-md font-light">
                    Get the best vegetables and fruits, straight from local
                    farmers to your doorstep.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
