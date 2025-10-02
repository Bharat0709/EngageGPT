export const getButtonConfig = ({
  verificationStep,
  isLoading,
  formData,
  passwordValidation,
}) => {
  if (verificationStep === 'email') {
    return {
      text: isLoading ? 'Sending verification email...' : 'Continue with Email',
      disabled: isLoading || !formData.email,
    };
  }

  if (verificationStep === 'setPassword') {
    return {
      text: isLoading ? 'Creating Account...' : 'Create Account',
      disabled:
        isLoading ||
        !isPasswordValid({ passwordValidation }) ||
        formData.password !== formData.confirmPassword,
    };
  }

  if (verificationStep === 'emailSetup') {
    return {
      text: 'Check your email to set password',
      disabled: true,
    };
  }

  return {
    text: 'Please verify your email',
    disabled: true,
  };
};

export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const isPasswordValid = async (passwordValidation) => {
  const { minLength, hasNumber, hasUppercase, hasLowercase, hasSpecialChar } =
    passwordValidation;
  return (
    minLength && hasNumber && hasUppercase && hasLowercase && hasSpecialChar
  );
};

export default isPasswordValid;
