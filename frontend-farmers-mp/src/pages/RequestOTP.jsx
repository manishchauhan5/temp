import React, { useState } from 'react';
import axios from 'axios'; // Ensure axios is installed and imported

const RequestOTP = ({ onStepChange }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      setMessage('');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/api/v1/auth/reset-password', { email });
      setMessage(response.data.message || 'OTP sent to your email.');
      setError('');
      onStepChange(email); // Proceed to OTP verification step
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.');
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 via-gray-900 to-black">
      <div className="w-full max-w-md p-8 rounded-lg shadow-xl bg-gray-900 text-white">
        <h1 className="text-3xl font-bold text-center mb-6 text-gradient bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Forgot Password
        </h1>

        <p className="text-sm text-gray-400 text-center mb-6">
          Enter your email address below to receive an OTP for resetting your password.
        </p>

        <form onSubmit={handleRequestOTP}>
          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-bold text-lg shadow-md hover:shadow-lg hover:from-blue-600 hover:to-purple-700 transition duration-300"
          >
            Send OTP
          </button>
        </form>

        {/* Messages */}
        {message && (
          <p className="text-green-400 text-center mt-4">
            {message}
          </p>
        )}
        {error && (
          <p className="text-red-400 text-center mt-4">
            {error}
          </p>
        )}

        {/* Back to Login */}
        <div className="text-center mt-6">
          <button
            type="button"
            className="text-blue-400 hover:underline"
            onClick={() => (window.location.href = '/login')}
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestOTP;
