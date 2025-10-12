import { goTo } from '@utils/navigator';
import { useNotifications } from '@components/Common/Notification';
import { forgotPassword } from '@services/Auth';

export const AuthFooter = ({ mode, email }) => {
  const message = useNotifications();
  const handleSendResetPasswordEmail = async () => {
    try {
      if (!email) {
        message.info('Please enter your email');
        return;
      }
      message.loading('Sending password reset email...');

      await forgotPassword(email);
      message.success(
        'Password reset email sent successfully!',
      );
    } catch (err) {
      message.error(err.message);
    }
  };

  const handleAuthNavigate = async () => {
    if (mode === 'signup') {
      goTo('/login');
    } else goTo('/signup');
  };

  return (
    <div>
      {mode === 'signup' ? (
        <div className="flex mt-4 items-center justify-center">
          <p className="text-sm text-center text-white">
            By signing in, you agree to our
            <a
              href="https://engagegpt.in/terms-of-service"
              className="text-sky-200 hover:underline ml-1"
            >
              Terms of Service
            </a>{' '}
            and{' '}
            <a
              href="https://engagegpt.in/privacy-policy"
              className="text-sky-200 hover:underline ml-1"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      ) : (
        <div className="flex m-0 mt-4 p-0 w-full justify-between text-center">
          <p className="text-white m-0 text-sm">Forgot your password? </p>
          <button
            type="button"
            onClick={handleSendResetPasswordEmail}
            className="text-sky-100 text-sm font-semibold underline ml-1"
          >
            Reset Password
          </button>
        </div>
      )}

      <div className="mt-4 w-full gap-4 flex justify-center items-center bg-sky-900 text-center">
        <p className="text-md m-0 text-white">
          {mode === 'signup' ? 'Already have an account?' : 'New to EngageGPT?'}
        </p>
        <button
          type="button"
          className="text-sky-100 text-md font-semibold underline ml-1"
          onClick={() => handleAuthNavigate()}
        >
          {mode === 'signup' ? 'Login' : 'Sign Up'}
        </button>
      </div>
    </div>
  );
};
