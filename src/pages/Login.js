import React, { useState, useEffect } from 'react';
import { Icons } from '@utils/constantData/icons';
import { login } from '@services/Auth';
import useAuthCheck from '@hooks/useAuth';
import { useDispatch } from 'react-redux';
import { AuthFooter } from '@components/Auth/Footer';
import { GoogleAuth } from '@components/Auth/GoogleAuth';
import { AuthHeader } from '@components/Auth/Header';
import { goTo } from '@utils/navigator';
import { useNotifications } from '@components/Common/Notification';
import { setAuthTokenAction } from '@redux/auth/authActions';
import { useLocation } from 'react-router-dom';

const Login = () => {
  useAuthCheck();
  const dispatch = useDispatch();
  const location = useLocation();
  const message = useNotifications();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lastLoginMethod, setLastLoginMethod] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Load last login method on mount
  useEffect(() => {
    const savedMethod = localStorage.getItem('lastLoginMethod');
    if (savedMethod) {
      setLastLoginMethod(savedMethod);
    }

    // Check for login errors from redirect
    const queryParams = new URLSearchParams(location.search);
    const errorParam = queryParams.get('error');
    if (errorParam) {
      let errorMessage = '';
      switch (errorParam) {
        case 'auth_failed':
          errorMessage = 'Google authentication failed. Please try again.';
          break;
        case 'token_failed':
          errorMessage = 'Authentication failed. Please login again.';
          break;
        default:
          errorMessage = 'Login failed. Please try again.';
      }
      message.error(errorMessage);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      message.error('Please fill out all required fields.');
      return;
    }
    try {
      setIsLoading(true);
      const loginResponse = await login(formData.email, formData.password);
      if (loginResponse.token) {
        localStorage.setItem('lastLoginMethod', 'email');
        dispatch(setAuthTokenAction(loginResponse.token));
        goTo(`/dashboard`);
        message.success('Login successful!');
      }

    } catch (error) {
      message.error(error.message || 'Login failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full flex items-center justify-center h-screen bg-sky-900">
        <div className="lg:w-1/2 w-full text-white px-8 py-4 bg-sky-900">
          <AuthHeader heading="Log In to your account" />
          <GoogleAuth lastUsed={lastLoginMethod === 'google'} />
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-2 block w-full p-3 border border-sky-700 rounded-full bg-sky-900 focus:bg-sky-900 focus:outline-none [&::-webkit-autofill]:bg-sky-900 [&::-webkit-autofill]:text-white"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                  autoComplete="current_password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full p-3 border rounded-full bg-sky-900 border-sky-700 focus:outline-none [&::-webkit-autofill]:bg-sky-800"
                  placeholder="••••••••"
                  required
                />
                <div
                  onClick={togglePasswordVisibility}
                  className="absolute top-5 right-3 cursor-pointer text-gray-300"
                >
                  {showPassword ? <Icons.Eye /> : <Icons.EyeSlash />}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center rounded-full bg-white text-sky-900 py-2 px-10"
            >
              {isLoading ? 'Logging In...' : 'Login'}
            </button>
          </form>

          {lastLoginMethod === 'email' && (
            <p className="w-fit self-center mx-auto text-black text-xs font-normal bg-white px-3 py-1 rounded-full mt-2">
              Last Used
            </p>
          )}
          <AuthFooter mode="login" email={formData?.email} />
        </div>
      </div>
    </div>
  );
};

export default Login;
