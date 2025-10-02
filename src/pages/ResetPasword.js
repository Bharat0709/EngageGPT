import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { FiEye, FiEyeOff, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import EngageGPTLogo from '@assets/images/EngageGPTLogo.png';
import { resetPassword, resendVerificationEmail } from '@services/Auth';
import { goTo } from '@utils/navigator';
import { useNotifications } from '@components/Common/Notification';

const PasswordSetReset = () => {
  const message = useNotifications();
  const { token } = useParams();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'reset'; // 'set' or 'reset'
  const email = searchParams.get('email') || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Password validation state
  const [validations, setValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
    match: false,
  });

  useEffect(() => {
    if (!token) {
      goTo('/');
      return;
    }
  }, [token]);

  useEffect(() => {
    validatePassword();
  }, [password, confirmPassword]);

  const validatePassword = () => {
    const newValidations = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      match: password === confirmPassword && password.length > 0,
    };
    setValidations(newValidations);
  };

  const isFormValid = () => {
    return Object.values(validations).every(Boolean);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isFormValid()) {
      setError('Please ensure all password requirements are met');
      return;
    }

    setLoading(true);
    try {
      await resetPassword(token, password, confirmPassword);
      setSuccess(true);
      message.success(
        `Password ${mode === 'set' ? 'set' : 'reset'} successfully!`,
      );

      setTimeout(() => {
        goTo('/login');
      }, 3000);
    } catch (err) {
      message.error(err.message || 'Something went wrong');
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (!email) {
      message.error('Email not found. Please request a new reset link.');
      return;
    }

    setResendLoading(true);
    try {
      await resendVerificationEmail(email);
      message.success('Verification email sent successfully!');
    } catch (err) {
      message.error(err.message || 'Failed to send verification email');
    } finally {
      setResendLoading(false);
    }
  };

  const renderValidationItem = (isValid, text) => (
    <div
      className={`flex items-center space-x-2 text-sm transition-all duration-300 ease-in-out ${
        isValid ? 'text-green-600 scale-105' : 'text-gray-500'
      }`}
    >
      {isValid ? (
        <FiCheckCircle className="text-green-600 flex-shrink-0 animate-pulse" />
      ) : (
        <FiXCircle className="text-gray-400 flex-shrink-0" />
      )}
      <span className={isValid ? 'line-through' : ''}>{text}</span>
    </div>
  );

  const renderSuccessAnimation = () => (
    <div className="flex flex-col items-center space-y-6">
      <div className="relative">
        <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center animate-bounce">
          <FiCheckCircle className="text-white text-2xl" />
        </div>
        <div className="absolute inset-0 w-20 h-20 border-4 border-green-200 rounded-full animate-ping"></div>
      </div>
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Password {mode === 'set' ? 'Set' : 'Reset'} Successfully!
        </h2>
        <p className="text-gray-600 mb-4 text-sm">
          Your password has been {mode === 'set' ? 'set' : 'updated'}{' '}
          successfully. Redirecting to login...
        </p>
        <div className="flex items-center justify-center space-x-2 text-blue-600">
          <AiOutlineLoading3Quarters className="animate-spin" />
          <span className="text-sm">Redirecting...</span>
        </div>
      </div>
    </div>
  );

  // Get only unmet validations for display
  const getUnmetValidations = () => {
    const validationRules = [
      { key: 'length', text: 'At least 8 characters' },
      { key: 'uppercase', text: 'One uppercase letter' },
      { key: 'lowercase', text: 'One lowercase letter' },
      { key: 'number', text: 'One number' },
      { key: 'special', text: 'One special character' },
      { key: 'match', text: 'Passwords match' },
    ];

    return validationRules.filter((rule) => !validations[rule.key]);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl border border-gray-300 p-6 backdrop-blur-sm bg-opacity-95">
            {renderSuccessAnimation()}
          </div>
        </div>
      </div>
    );
  }

  const unmetValidations = getUnmetValidations();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border border-gray-200  p-6 backdrop-blur-sm bg-opacity-95">
          <div className="text-center mb-6">
            <img
              src={EngageGPTLogo}
              alt="EngageGPT Logo"
              className="mx-auto h-12 mb-4"
            />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {mode === 'set' ? 'Set Your Password' : 'Reset Password'}
            </h1>
            {email && (
              <p className="text-sm text-gray-500 mb-1">
                for <span className="font-medium text-gray-700">{email}</span>
              </p>
            )}
            <p className="text-gray-600 text-sm">
              {mode === 'set'
                ? 'Create a secure password for your account'
                : 'Enter your new password below'}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg animate-fadeIn">
              <div className="flex items-center space-x-2">
                <FiXCircle className="text-red-500 flex-shrink-0" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* New Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pr-12"
                  placeholder="Enter your new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pr-12"
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showConfirmPassword ? (
                    <FiEyeOff size={18} />
                  ) : (
                    <FiEye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Dynamic Password Requirements - Only show unmet requirements */}
            {unmetValidations.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-4 transition-all duration-300">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Password Requirements:
                </p>
                <div className="space-y-1">
                  {unmetValidations.map((rule, index) => (
                    <div
                      key={rule.key}
                      className="animate-fadeIn"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {renderValidationItem(validations[rule.key], rule.text)}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* All requirements met indicator */}
            {unmetValidations.length === 0 && password.length > 0 && (
              <div className="bg-green-50 rounded-lg p-4 border border-green-200 animate-fadeIn">
                <div className="flex items-center space-x-2">
                  <FiCheckCircle className="text-green-600 animate-pulse" />
                  <p className="text-sm font-medium text-green-700">
                    All password requirements met!
                  </p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !isFormValid()}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 transform ${
                loading || !isFormValid()
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 active:scale-95'
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <AiOutlineLoading3Quarters className="animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : (
                `${mode === 'set' ? 'Set' : 'Reset'} Password`
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Remember your password?{' '}
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PasswordSetReset;
