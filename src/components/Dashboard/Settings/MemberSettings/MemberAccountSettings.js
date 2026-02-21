import { Icons } from '@utils/constantData/icons';
import { useState } from 'react';
import { DeleteAccountModal } from './DeleteAccountModal';
import { deleteMemberAccount } from '@services/Members';
import { useNotifications } from '@components/Common/Notification';
import { goTo } from '@utils/navigator';

const AccountSettings = ({ onClose, memberData }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const message = useNotifications();
  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      await deleteMemberAccount(memberData._id);
      setLoading(false);
      setShowDeleteModal(false);
      setTimeout(() => {
        goTo(`/dashboard/settings`);
      }, 1000);
      message.success('Member Data Deleted successfully');
    } catch (error) {
      message.error('Failed to delete member data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black bg-opacity-50 flex items-center justify-center p-4 backdrop-blur-sm transition-opacity">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl h-fit lg:h-fit flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <h2 className="text-xl m-0 p-0 ovo-regular font-semibold text-gray-900">
              Account Settings
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Icons.Cross size={20} />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Content */}
          <div className="flex-1 overflow-y-scroll scrollbar-hide">
            <div className="space-y-6">
              <div className="rounded-xl p-4 border-red-200">
                <div className="border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-3">
                      <Icons.Alert className="w-5  mt-1 mb-3 h-5 text-gray-700" />
                      <div>
                        <h3 className="text-lg ovo-regular  m-0 p-0  font-semibold text-gray-900">
                          Dangerous Actions
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Icons.Trash className="w-5 h-5 text-red-500 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-medium p-0 m-0 text-red-900">
                          Delete Account
                        </h4>
                        <p className="text-sm p-0 m-0 text-red-700 mt-1">
                          Permanently delete your account and all associated
                          data. This action cannot be undone.
                        </p>
                        <button
                          onClick={() => setShowDeleteModal(true)}
                          className="mt-3 px-6 py-2 text-sm bg-red-600 text-white hover:bg-red-700 rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showDeleteModal && (
          <DeleteAccountModal
            loading={loading}
            setShowDeleteModal={setShowDeleteModal}
            handleDeleteAccount={handleDeleteAccount}
          />
        )}
      </div>
    </div>
  );
};

export default AccountSettings;
