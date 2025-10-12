import React, { useState, useEffect } from 'react';

import { goTo } from '@utils/navigator';
import {
  signup,
  sendVerificationEmail,
  checkVerificationStatus,
  resendVerificationEmail,
} from '@services/Auth';
import useAuthCheck from '@hooks/useAuth';
import {
  EmailStatus,
  StatusMessage,
} from '@components/Auth/SignUp/StatusMessage';
import { PasswordFields } from '@components/Auth/SignUp/PasswordFields';
import { AuthFooter } from '@components/Auth/Footer';
import { GoogleAuth } from '@components/Auth/GoogleAuth';
import { AuthHeader } from '@components/Auth/Header';
import { getButtonConfig, formatTime } from '@components/Auth/SignUp/Helpers';
import isPasswordValid from '@components/Auth/SignUp/Helpers';
import { useNotifications } from '@components/Common/Notification';

const Signup = () => {
  useAuthCheck();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [verificationStep, setVerificationStep] = useState('email');
  const [passwordStatus, setPasswordStatus] = useState(false);
  const [organizationStatus, setOrganizationStatus] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasNumber: false,
    hasUppercase: false,
    hasLowercase: false,
    hasSpecialChar: false,
  });
  const message = useNotifications();

  useEffect(() => {
    let interval;
    if (timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timeLeft]);

  useEffect(() => {
    let interval;
    if (verificationStep === 'pending' && formData.email) {
      interval = setInterval(async () => {
        await checkVerification();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [verificationStep, formData.email]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (verificationStep === 'pending' || verificationStep === 'verified') {
        e.preventDefault();
        e.returnValue = '';
        return '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [verificationStep]);

  const validatePassword = (password) => {
    const validation = {
      minLength: password.length >= 8,
      hasNumber: /\d/.test(password),
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
    setPasswordValidation(validation);
    return validation;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });

    if (name === 'password') {
      validatePassword(value);
    }
  };

  const handleEmailVerification = async (e) => {
    e.preventDefault();

    if (!formData.email) {
      message.error('Please enter your work email address.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      message.error('Please enter a valid email address.');
      return;
    }

    const timeZone =
      Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Calcutta';

    try {
      setIsLoading(true);
      const result = await sendVerificationEmail(formData.email, timeZone);
      setPasswordStatus(result.data.isPasswordPresent);
      const isOrgVerified = result.data.isVerified;
      setOrganizationStatus(isOrgVerified ? 'Verified' : 'Unverified');

      if (isOrgVerified && result.data.isPasswordPresent) {
        message.info('Account already exists. Please login instead.');
        goTo('/login');
        return;
      } else if (isOrgVerified && !result.data.isPasswordPresent) {
        setVerificationStep('emailSetup');
        message.info(
          'Email verified! Please check your email to set your password.',
        );
      } else {
        setVerificationStep('pending');
        setTimeLeft(300);
        setCanResend(false);
        message.success(result.message);
      }
    } catch (error) {
      message.error(error.message || 'Failed to send verification email');
    } finally {
      setIsLoading(false);
    }
  };

  const checkVerification = async () => {
    try {
      const isVerified = await checkVerificationStatus(formData.email);

      if (isVerified) {
        setOrganizationStatus('Verified');

        if (passwordStatus === false) {
          setVerificationStep('setPassword');
          message.success(
            'Email verified successfully! Please set your password.',
          );
        } else {
          message.info('Account already exists. Please login instead.');
          goTo('/login');
        }
      }
    } catch (error) {
      message.error('Verification check failed');
    }
  };

  const handleResendEmail = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await resendVerificationEmail(formData.email);
      setTimeLeft(300);
      setCanResend(false);
      message.success('Verification email resent!');
    } catch (error) {
      message.error(error.message || 'Failed to resend verification email');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (verificationStep === 'email') {
      return handleEmailVerification(e);
    }

    if (verificationStep !== 'setPassword') {
      message.error('Please verify your email first.');
      return;
    }

    if (!formData.password || !formData.confirmPassword) {
      message.error('Please fill out all required fields.');
      return;
    }

    if (!isPasswordValid({ passwordValidation })) {
      message.error('Password does not meet the requirements.');
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
      goTo(`/dashboard?token=${signupResponse.token}`);
      message.success('Account created successfully!');
    } catch (error) {
      message.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const buttonConfig = getButtonConfig({
    verificationStep,
    passwordValidation,
    isLoading,
    formData,
  });

  return (
    <div className="flex min-h-screen items-center py-4 bg-sky-900 justify-center">
      <div className="w-full h-full bg-sky-900 flex flex-col items-center justify-center lg:flex-row">
        <div className="lg:w-1/2 my-auto w-full items-center justify-center text-white px-8 bg-sky-900">
          <AuthHeader heading="Ready to join us? Sign up now" />
          <GoogleAuth />
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                disabled={verificationStep !== 'email'}
                className="mt-1 block w-full p-3 border border-sky-700 rounded-full pl-4 bg-sky-900 focus:outline-none [&::-webkit-autofill]:bg-sky-800 disabled:opacity-50"
                placeholder="Enter your personal or work email"
                required
              />

              <EmailStatus
                verificationStep={verificationStep}
                organizationStatus={organizationStatus}
                timeLeft={timeLeft}
                canResend={canResend}
                isLoading={isLoading}
                onResendEmail={handleResendEmail}
                formatTime={formatTime}
              />
            </div>

            <StatusMessage
              verificationStep={verificationStep}
              organizationStatus={organizationStatus}
            />

            <PasswordFields
              verificationStep={verificationStep}
              formData={formData}
              onChange={handleChange}
              showPassword={showPassword}
              onTogglePassword={togglePasswordVisibility}
              passwordValidation={passwordValidation}
            />

            <button
              type="submit"
              disabled={buttonConfig.disabled}
              className="w-full flex items-center justify-center rounded-full bg-white text-sky-900 py-2 px-10 disabled:opacity-50"
            >
              {buttonConfig.text}
            </button>
          </form>
          <AuthFooter mode="signup" />
        </div>
      </div>
    </div>
  );
};

export default Signup;
