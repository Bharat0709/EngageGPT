import { Icons } from '@utils/constantData/icons';

export const OrganizationCard = ({ userData }) => {
  return (
    <div className="mb-6 bg-[#f2f5f5]  rounded-xl p-2 pr-4 flex flex-col gap-3 justify-between">
      <div className="p-2 pr-2 rounded-xl flex gap-6 items-start justify-between">
        <div className="flex justify-start items-center gap-4">
          {userData?.profilePicture ? (
            <img
              src={userData?.profilePicture}
              alt="Profile"
              className="mt-1 w-16 h-16 rounded-full object-cover border"
            />
          ) : (
            <img
              src="https://firebasestorage.googleapis.com/v0/b/coldemail-2d11a.appspot.com/o/Avatar.png?alt=media&token=b07b4ca9-074c-465e-985b-7c6e562f2e7b"
              alt="Profile"
              className="mt-1 w-16 h-16 rounded-full object-cover border"
            />
          )}
          <div className="flex flex-col gap-1">
            <p className="text-lg p-0 m-0 text-gray-900">
              {userData?.name || 'N/A'}
            </p>
            <p className="text-sm p-0 m-0 text-gray-900">
              {userData?.email || 'N/A'}
            </p>
          </div>
        </div>

        <button
          disabled={userData?.oauthProvider === 'google'}
          onClick={() => setIsModalOpen(true)}
          className={`text-black ${
            userData?.oauthProvider === 'google'
              ? 'cursor-not-allowed'
              : 'cursor-pointer'
          }`}
        >
          <Icons.Edit className="text-xl h-6 lg:mt-0 mt-2" />
        </button>
      </div>

      <div className="flex w-full justify-between items-center">
        <p className="w-full text-sm px-2 text-left text-gray-500">
          <div className="flex lg:flex-row flex-col justify-between w-full lg:items-center items-start lg:gap-2 gap-4">
            <div className="flex lg:flex-row flex-col gap-2 lg:gap-4">
              <p className="p-0 m-0">
                Logged in via:{' '}
                <span className="font-bold p-0 m-0">
                  {userData.oauthProvider === 'google' ? 'Google' : 'Password'}
                </span>
              </p>
              <p className="p-0 m-0">
                Current Plan:{' '}
                <span className="font-bold p-0 m-0">
                  {userData?.subscription?.plan.toUpperCase()}
                </span>
              </p>
            </div>
            {userData.oauthProvider !== 'google' && (
              <button className="text-gray-800 text-left self-end text-sm p-0 m-0">
                Reset Password
              </button>
            )}
          </div>
        </p>
      </div>
    </div>
  );
};
