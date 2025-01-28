import React, { useState } from 'react';
import axios from 'axios';

const VerifyOTP = ({ email, onStepChange }) => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [resendMessage, setResendMessage] = useState('');

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/v1/auth/reset-password/verify', { email, otp });
      setMessage(response.data.message); // "OTP verified successfully."
      setError('');
      onStepChange(); // Proceed to the next step
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.');
      setMessage('');
    }
  };

  const handleResendOTP = async () => {
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 via-gray-900 to-black">
      <div className="w-full max-w-md p-8 rounded-lg shadow-xl bg-gray-900 text-white">
        <h1 className="text-3xl font-bold text-center mb-6 text-gradient bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Verify OTP
        </h1>

        <p className="text-sm text-gray-400 text-center mb-6">
          Enter the OTP sent to your email address to proceed with resetting your password.
        </p>

        <form onSubmit={handleVerifyOTP}>
          {/* OTP Field */}
          <div className="mb-4">
            <label htmlFor="otp" className="block text-sm font-medium mb-1">
              OTP
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the OTP"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-bold text-lg shadow-md hover:shadow-lg hover:from-blue-600 hover:to-purple-700 transition duration-300"
          >
            Verify OTP
          </button>
        </form>

        {/* Resend OTP Button */}
        <button
          onClick={handleResendOTP}
          className="mt-4 w-full py-2 bg-gray-700 rounded-lg text-white font-medium hover:bg-gray-600 transition duration-300"
        >
          Resend OTP
        </button>

        {/* Feedback Messages */}
        {message && <p className="mt-4 text-green-500 text-center">{message}</p>}
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        {resendMessage && <p className="mt-4 text-blue-400 text-center">{resendMessage}</p>}
      </div>
    </div>
  );
};

export default VerifyOTP;
