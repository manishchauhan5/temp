import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "./LoadingSpinner";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validate passwords
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "https://temp-ofzo.onrender.com/api/v1/auth/register",
        {
          name,
          email,
          password,
        }
      );
      toast.success(response.data.message || "Registration successful!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
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
                Welcome to Farmers Marketplace!
              </h1>
              <p className="text-md text-center font-light mb-6">
                Join us to buy and sell fresh vegetables and fruits directly
                from local farmers.
              </p>
              <form className="space-y-4" onSubmit={handleRegister}>
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-3 py-2 rounded-lg bg-gray-100 text-green-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

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
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block text-sm font-medium mb-1"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirm-password"
                    className="w-full px-3 py-2 rounded-lg bg-gray-100 text-green-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-2 bg-green-600 rounded-lg text-white font-bold text-md shadow-md hover:shadow-lg hover:bg-green-700 transition duration-300"
                >
                  Register
                </button>
              </form>

              {/* Redirect to Login */}
              <p className="text-sm text-center mt-4">
                Already have an account?{" "}
                <button
                  onClick={() => {
                    navigate("/login");
                  }}
                  type="button"
                  className="text-green-600 hover:underline transition duration-200"
                >
                  Login
                </button>
              </p>
            </div>

            {/* Right Side: Image */}
            <div className="hidden md:block w-1/2 relative">
              <img
                src="https://images.pexels.com/photos/5677399/pexels-photo-5677399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Fresh produce"
                className="h-full w-full object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <h2 className="text-2xl font-bold mb-2">
                    Fresh from the Farm
                  </h2>
                  <p className="text-md font-light">
                    Supporting local farmers and delivering freshness to your
                    doorstep.
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

export default Register;
