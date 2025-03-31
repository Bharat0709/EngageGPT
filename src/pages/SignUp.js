import React, { useState } from 'react';
import { message } from 'antd';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import EngageGPTLogo from '../assets/images/EngageGPTLogoIocn.png';
import signupIllustration from '../assets/images/engagegptLogin.png';
import { signup } from '../network/Auth';
import { useNavigate } from 'react-router-dom';
import useAuthCheck from '../hooks/useAuth';

const Signup = () => {
  useAuthCheck();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleGoogleSignUp = async (e) => {
    e.preventDefault();
    const authUrl = `${process.env.REACT_APP_OAUTH_URL}`;
    window.location.href = authUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    if (!formData.email || !formData.password) {
      message.error('Please fill out all required fields.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      message.error('Passwords do not match.');
      return;
    }
    try {
      setIsLoading(true);
      const signupResponse = await signup(
        formData.email,
        formData.password,
        formData.confirmPassword,
      );
      console.log(signupResponse);
      navigate(`/dashboard?token=${signupResponse.token}`);
      message.success('Signup successful!');
    } catch (error) {
      message.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full h-full lg:bg-white bg-sky-900 flex flex-col lg:flex-row">
        <div className="lg:w-1/2 w-full text-white px-8 py-4 bg-sky-900">
          <div className="w-full mb-6 flex items-center gap-2 lg:justify-start justify-center">
            <img
              src={EngageGPTLogo}
              alt="EngageGPT Logo"
              className="flex w-10 h-10"
            />
            EngageGPT
          </div>
          <h2 className="text-2xl font-semibold text-white  text-center mb-6">
            Create Your Account
          </h2>

          <button
            onClick={handleGoogleSignUp}
            className="flex w-full items-center justify-center border border-gray-300 bg-white text-sky-900 py-2 px-4 rounded-full"
          >
            <FcGoogle className="mr-2" size={20} />
            Sign in with Google
          </button>

          <div className="flex my-4 items-center justify-center space-x-2">
            <span className="h-px w-16 bg-gray-300"></span>
            <span className="text-sm text-white">or</span>
            <span className="h-px w-16 bg-gray-300"></span>
          </div>

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
                className="mt-1 block w-full p-3 border-b border-gray-300 bg-sky-900  focus:outline-none [&::-webkit-autofill]:bg-sky-800"
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
                  className="mt-1 block w-full p-3 border-b border-gray-300 bg-sky-900 focus:outline-none [&::-webkit-autofill]:bg-sky-800"
                  placeholder="••••••••"
                  required
                />
                <div
                  onClick={togglePasswordVisibility}
                  className="absolute top-4 right-3 cursor-pointer text-gray-300"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-white"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="mt-1 block w-full p-3 border-b border-gray-300 bg-sky-900 focus:outline-none [&::-webkit-autofill]:bg-sky-800"
                  placeholder="••••••••"
                  required
                />
                <div
                  onClick={togglePasswordVisibility}
                  className="absolute top-4 right-3 cursor-pointer text-gray-300"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center rounded-full bg-white text-sky-900 py-2 px-10"
            >
              {isLoading ? 'Signing Up...' : 'Sign Up'}
            </button>

            <div className="flex items-center justify-center">
              <p className="text-sm text-center text-white">
                By signing in, you agree to our
                <a
                  href="https://engagegpt.in/terms-of-service"
                  className="text-sky-100 hover:underline ml-1"
                >
                  Terms of Service
                </a>{' '}
                and{' '}
                <a
                  href="https://engagegpt.in/privacy-policy"
                  className="text-sky-100 hover:underline ml-1"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </div>

            <div className="mt-4 text-center">
              <p className="text-sm text-white">
                Already have an account?
                <button
                  type="button"
                  className="text-sky-100 hover:underline ml-1"
                  onClick={() => navigate('/login')}
                >
                  Login
                </button>
              </p>
            </div>
          </form>
        </div>

        <div className="lg:w-1/2 h-screen hidden lg:block">
          <img
            src={signupIllustration}
            alt="Signup Illustration"
            className="w-full h-full p-14"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
