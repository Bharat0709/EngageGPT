import React, { useState, useEffect } from 'react';
import { FiCheckCircle, FiXCircle, FiRefreshCw } from 'react-icons/fi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useSearchParams } from 'react-router-dom';
import { useNotifications } from '@components/Common/Notification';
import EngageGPTLogo from '@assets/images/EngageGPTLogo.png';
import { resendVerificationEmail, verifyMail } from '@services/Auth';

const EmailVerification = () => {
  const message = useNotifications();
  const [verificationStatus, setVerificationStatus] = useState('loading'); // loading, success, failed
  const [isResending, setIsResending] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email') || '';
  const decodedEmail = decodeURIComponent(email);

  useEffect(() => {
    if (token && decodedEmail) {
      verifyEmail();
    }
  }, [token, email]);

  const verifyEmail = async () => {
    try {
      setVerificationStatus('loading');
      const response = await verifyMail(decodedEmail, token);
      if (response.success) {
        message.success(response.message);
        setTimeout(() => {
          setVerificationStatus('success');
        }, 2000);
      } else {
        setTimeout(() => {
          setVerificationStatus('failed');
        }, 2000);
      }
    } catch (error) {
      setTimeout(() => {
        setVerificationStatus('failed');
      }, 2000);
    }
  };

  const handleResendEmail = async () => {
    try {
      setIsResending(true);
      await resendVerificationEmail(decodedEmail);
      message.success('Verification email sent successfully!');
    } catch (error) {
      message.error('Failed to resend email');
    } finally {
      setIsResending(false);
    }
  };

  const renderVerificationAnimation = () => {
    if (verificationStatus === 'loading') {
      return (
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <AiOutlineLoading3Quarters className="text-white text-3xl animate-spin" />
            </div>
            <div className="absolute inset-0 w-24 h-24 border-4 border-blue-200 rounded-full animate-pulse"></div>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Verifying Your Email
            </h2>
            <p className="text-gray-600">
              Please wait while we verify your email address...
            </p>
          </div>
        </div>
      );
    }

    if (verificationStatus === 'success') {
      return (
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center animate-bounce">
              <FiCheckCircle className="text-white text-3xl" />
            </div>
            <div className="absolute inset-0 w-24 h-24 border-4 border-green-200 rounded-full animate-ping"></div>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Email Verified!
            </h2>
            <p className="text-gray-600 mb-6">
              Your email has been successfully verified. You can now proceed to
              set your password.
            </p>
          </div>
        </div>
      );
    }

    if (verificationStatus === 'failed') {
      return (
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center animate-pulse">
              <FiXCircle className="text-white text-3xl" />
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Verification Failed
            </h2>
            <p className="text-gray-600 mb-6">
              We couldn't verify your email. The link might be expired or
              invalid.
            </p>
            <button
              onClick={handleResendEmail}
              disabled={isResending}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isResending ? (
                <>
                  <AiOutlineLoading3Quarters className="animate-spin mr-2" />
                  Resending...
                </>
              ) : (
                <>
                  <FiRefreshCw className="mr-2" />
                  Resend Verification Email
                </>
              )}
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Main Card */}
        <div className="bg-white rounded-2xl border border-gray-300 p-8 backdrop-blur-sm bg-opacity-90">
          <div className="text-center mb-8">
            <img
              src={EngageGPTLogo}
              alt="EngageGPT Logo"
              className="mx-auto h-12 mb-4"
            />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Email Verification
            </h1>
            <p className="text-gray-600">We're verifying your email address</p>
          </div>

          {/* Verification Status */}
          <div className="mb-8">{renderVerificationAnimation()}</div>

          {/* Email Display */}
          {email && (
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-2">Verifying email:</p>
              <p className="text-sm font-medium text-gray-800 bg-gray-100 px-4 py-2 rounded-lg">
                {email}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Need help?{' '}
            <a
              href="/support"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
