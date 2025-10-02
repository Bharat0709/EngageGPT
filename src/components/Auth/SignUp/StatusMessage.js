export const StatusMessage = ({ verificationStep, organizationStatus }) => {
  if (verificationStep === 'pending' && organizationStatus === 'Unverified') {
    return (
      <div className="bg-sky-800 p-4 rounded-lg">
        <p className="text-sm text-white mb-2">
          <strong>Important: Do not reload or close this window!</strong>
        </p>
        <p className="text-sm text-white mb-2">
          We've sent a verification email to your work address. Please check
          your inbox and click the verification link.
        </p>
        <p className="text-sm text-white mb-2">
          <strong>We will automatically check the verification status</strong>
        </p>
        <p className="text-xs text-gray-300">
          You have 5 minutes to verify your email before you can set your
          password.
        </p>
      </div>
    );
  }

  if (verificationStep === 'setPassword') {
    return (
      <div className="bg-sky-800 p-4 rounded-lg">
        <p className="text-sm text-white mb-2">
          <strong>✓ Email Verified!</strong>
        </p>
        <p className="text-xs text-white">
          Please set your password to complete your account setup.
        </p>
      </div>
    );
  }

  if (verificationStep === 'emailSetup') {
    return (
      <div className="bg-sky-800 p-4 rounded-lg">
        <p className="text-sm text-white mb-2">
          <strong>✓ Email Already Verified!</strong>
        </p>
        <p className="text-sm text-white mb-2">
          We've sent a password setup email to your address. Please check your
          inbox and follow the instructions to set your password.
        </p>
        <p className="text-xs text-gray-300">
          Once you've set your password via email, you can login to your
          account.
        </p>
      </div>
    );
  }

  return null;
};

export const EmailStatus = ({
  verificationStep,
  organizationStatus,
  timeLeft,
  canResend,
  isLoading,
  onResendEmail,
  formatTime,
}) => {
  if (verificationStep === 'email') return null;

  return (
    <div className="mt-2 flex items-center justify-between">
      <span
        className={`text-sm ${
          organizationStatus === 'Verified'
            ? 'text-green-400'
            : 'text-yellow-400'
        }`}
      >
        Email Status: {organizationStatus}
      </span>

      {verificationStep === 'pending' &&
        organizationStatus === 'Unverified' && (
          <div className="flex items-center gap-3">
            {timeLeft > 0 && (
              <span className="text-sm text-gray-300">
                {formatTime(timeLeft)}
              </span>
            )}
            {canResend && (
              <button
                type="button"
                onClick={onResendEmail}
                disabled={isLoading}
                className="text-sm text-sky-100 hover:underline"
              >
                Resend Email
              </button>
            )}
          </div>
        )}
    </div>
  );
};
