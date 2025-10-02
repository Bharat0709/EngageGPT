import React from 'react';
import { Icons } from '@utils/constantData/icons';
import {
  PasswordValidation,
  PasswordMatchIndicator,
} from '@components/Auth/SignUp/PasswordValidation';

export const PasswordFields = ({
  verificationStep,
  formData,
  onChange,
  showPassword,
  onTogglePassword,
  passwordValidation,
}) => {
  if (verificationStep !== 'setPassword') return null;

  return (
    <>
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
            onChange={onChange}
            className="mt-1 block w-full p-3 border border-sky-700 rounded-full pl-4 bg-sky-900 focus:outline-none [&::-webkit-autofill]:bg-sky-800"
            placeholder="••••••••"
            required
          />
          <div
            onClick={onTogglePassword}
            className="absolute top-4 right-3 cursor-pointer text-gray-300"
          >
            {showPassword ? <Icons.Eye /> : <Icons.EyeSlash />}
          </div>
        </div>

        <PasswordValidation
          passwordValidation={passwordValidation}
          password={formData.password}
        />
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
            onChange={onChange}
            className="mt-1 block w-full p-3 border border-sky-700 rounded-full pl-4 bg-sky-900 focus:outline-none [&::-webkit-autofill]:bg-sky-800"
            placeholder="••••••••"
            required
          />
          <div
            onClick={onTogglePassword}
            className="absolute top-4 right-3 cursor-pointer text-gray-300"
          >
            {showPassword ? <Icons.Eye /> : <Icons.EyeSlash />}
          </div>
        </div>

        <PasswordMatchIndicator
          password={formData.password}
          confirmPassword={formData.confirmPassword}
        />
      </div>
    </>
  );
};
