// components/PasswordValidation.jsx
import React from 'react';

const PasswordValidationIndicator = ({ isValid, text }) => (
  <div className="flex items-center gap-2 text-xs">
    <span className={`${isValid ? 'text-green-400' : 'text-gray-400'}`}>
      {isValid ? '✓' : '○'}
    </span>
    <span className={`${isValid ? 'text-green-400' : 'text-gray-400'}`}>
      {text}
    </span>
  </div>
);

export const PasswordValidation = ({ passwordValidation, password }) => {
  if (!password) return null;

  return (
    <div className="mt-2 space-y-1">
      <PasswordValidationIndicator
        isValid={passwordValidation.minLength}
        text="At least 8 characters"
      />
      <PasswordValidationIndicator
        isValid={passwordValidation.hasUppercase}
        text="One uppercase letter"
      />
      <PasswordValidationIndicator
        isValid={passwordValidation.hasLowercase}
        text="One lowercase letter"
      />
      <PasswordValidationIndicator
        isValid={passwordValidation.hasNumber}
        text="One number"
      />
      <PasswordValidationIndicator
        isValid={passwordValidation.hasSpecialChar}
        text="One special character (!@#$%^&*)"
      />
    </div>
  );
};

export const PasswordMatchIndicator = ({ password, confirmPassword }) => {
  if (!confirmPassword) return null;

  return (
    <div className="mt-2">
      <PasswordValidationIndicator
        isValid={password === confirmPassword}
        text="Passwords match"
      />
    </div>
  );
};
