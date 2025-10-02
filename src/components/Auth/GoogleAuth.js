import { Icons } from '@utils/constantData/icons';

export const GoogleAuth = () => {
  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    const authUrl = `${process.env.REACT_APP_OAUTH_URL}`;
    window.location.href = authUrl;
  };
  return (
    <div>
      <button
        onClick={handleGoogleLogin}
        className="flex items-center  w-full justify-center border border-gray-300 bg-white text-sky-900 py-2 px-4 rounded-full"
      >
        <Icons.Google className="mr-2" size={20} />
        Continue with Google
      </button>
      <p className="w-fit self-center mx-auto text-black text-xs font-normal  bg-white px-3 py-1 rounded-full mt-2">
        {' '}
        Recommended
      </p>
      <div className="flex my-4 items-center justify-center space-x-2">
        <span className="text-sm text-white">OR</span>
      </div>
    </div>
  );
};
