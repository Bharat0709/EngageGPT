import React, { useState } from 'react';
import { message } from 'antd';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import EngageGPTLogo from '../assets/images/EngageGPTLogoIocn.png';
import loginIllustration from '../assets/images/engagegptLogin.png';
import { login } from '../network/Auth';
import useAuthCheck from '../hooks/useAuth';
import { forgotPassword } from '../network/Organization';

const Login = () => {
  useAuthCheck();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleLogin = () => {
    const authUrl = `${process.env.REACT_APP_OAUTH_URL}`;
    window.location.href = authUrl;
  };

  const handleSendResetPasswordEmail = async () => {
    try {
      if (!formData.email) {
        message.error('Please enter your email');
        return;
      }

      await forgotPassword(formData.email);
      message.success({
        content:
          'Password reset email sent successfully! (Check spam folder as well)',
        key: 'reset',
      });
    } catch (err) {
      message.error(err.message);
    }
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
        navigate(`/dashboard?token=${loginResponse.token}`);
      }

      message.success('Login successful!');
    } catch (error) {
      message.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full h-screen lg:bg-white bg-sky-900 flex flex-col lg:flex-row">
        <div className="lg:w-1/2 w-full text-white px-8 py-4 bg-sky-900">
          <Link to="/">
            <div className="w-full  mb-6 flex items-center gap-2 lg:justify-start justify-center">
              <img
                src={EngageGPTLogo}
                alt="EngageGPT Logo"
                className="flex w-10 h-10"
              />
              EngageGPT
            </div>
          </Link>
          <h2 className="text-2xl lg:text-left text-center font-semibold text-white mb-6">
            Login to Your Account
          </h2>
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
                className="mt-1 block w-full p-3 border-b bg-sky-900 border-gray-300 focus:bg-sky-900 focus:outline-none [&::-webkit-autofill]:bg-sky-900 [&::-webkit-autofill]:text-white"
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
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full p-3 border-b bg-sky-900 border-gray-300 focus:outline-none [&::-webkit-autofill]:bg-sky-800"
                  placeholder="••••••••"
                  required
                />
                <div
                  onClick={togglePasswordVisibility}
                  className="absolute top-5 right-3 cursor-pointer text-gray-300"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className=" w-full flex items-center justify-center rounded-full bg-white text-sky-900 py-2 px-10"
            >
              {isLoading ? 'Logging In...' : 'Login'}
            </button>

            <div className="flex m-0 p-0 w-full justify-between text-center">
              <p className="text-white text-xs">Forgot your password? </p>
              <button
                type="button"
                onClick={handleSendResetPasswordEmail}
                className="text-sky-100 text-xs underline ml-1"
              >
                Reset Password
              </button>
            </div>

            <div className="flex items-center justify-center space-x-2">
              <span className="h-px w-16 bg-gray-300"></span>
              <span className="text-sm text-white">or</span>
              <span className="h-px w-16 bg-gray-300"></span>
            </div>

            <button
              onClick={handleGoogleLogin}
              className="flex items-center  w-full justify-center border border-gray-300 bg-white text-sky-900 py-2 px-4 rounded-full"
            >
              <FcGoogle className="mr-2" size={20} />
              Sign in with Google
            </button>

            <div className="mt-4 text-center">
              <p className="text-sm text-white">
                Don't have an account?
                <button
                  type="button"
                  className="text-sky-100 hover:underline ml-1"
                  onClick={() => navigate('/signup')}
                >
                  Sign Up
                </button>
              </p>
            </div>
          </form>
        </div>
        <div className="lg:w-1/2 h-full hidden lg:block">
          <img
            src={loginIllustration}
            alt="Login Illustration"
            className="w-full h-full p-14"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
