import { Icons } from '@utils/constantData/icons';
import binIcon from '@assets/images/bin.png';
export const DeleteAccountModal = ({
  loading,
  setShowDeleteModal,
  handleDeleteAccount,
}) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={() => setShowDeleteModal(false)}
        ></div>
        <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className='flex gap-3 items-center'>
              <img className="h-8 w-8" src={binIcon} alt="binIcon" />
              <h3 className="text-xl m-0 p-0 ovo-regular font-semibold text-gray-900">
                Delete Account
              </h3>
            </div>
            <button
              onClick={() => setShowDeleteModal(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Icons.Cross size={20} />
            </button>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg">
                <Icons.Trash className="w-5 h-5 text-red-500 mt-0.5" />
                <p className="text-sm text-red-700 m-0 p-0 ">
                  This will permanently delete your account and all associated
                  data. This action cannot be undone.
                </p>
              </div>
              <div className="space-y-3">
                <p className="text-sm text-gray-600">
                  Before deleting your account, please consider:
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• All your saved posts will be permanently deleted</li>
                  <li>• Your analytics and activity data will be lost</li>
                  <li>• LinkedIn connections will be revoked</li>
                  <li>• This action cannot be reversed</li>
                </ul>
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-sky-900  text-white hover:scale-2 text-sm font-medium  rounded-full transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={loading}
                  className="px-4 py-2 bg-white text-red-700 border-red-600 border  hover:text-white text-sm font-medium hover:bg-red-700 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loading ? (
                    <svg
                      className="animate-spin h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : null}
                  Delete My Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
