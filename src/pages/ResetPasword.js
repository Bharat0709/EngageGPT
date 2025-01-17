import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { message } from 'antd';
import EngageGPTLogo from '../assets/images/EngageGPTLogo.png';
import { resetPassword } from '../network/Organization';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!password || password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!token) {
      navigate('/');
      return;
    }

    setLoading(true);
    try {
      await resetPassword(token, password, confirmPassword);
      message.success('New password set successfully');
      setSuccess('Password reset successfully. Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      message.error(err.message || 'Something went wrong');
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
      <div className="bg-white flex items-center flex-col p-3 rounded-xl w-full max-w-md">
        <img
          className="h-16 my-2 items-center flex justify-center"
          src={EngageGPTLogo}
          alt="EngageGPT Logo"
        />
        <h2 className="text-xl text-center mb-4">Reset Password</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success ? (
          <p className="text-green-500 mb-4">{success}</p>
        ) : (
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-4 w-full">
              <label htmlFor="password" className="block text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline focus:ring-black"
                required
              />
            </div>
            <div className="mb-4 w-full">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full global-button-primary text-white py-2 px-4 rounded-lg ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Processing...' : 'Reset Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
