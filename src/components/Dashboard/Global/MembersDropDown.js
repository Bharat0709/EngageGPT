// Modern Profile Dropdown Component
import { FiUsers, FiCopy } from 'react-icons/fi';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';

const MembersProfileDropDown = ({ profiles, onProfileChange, onCopy }) => (
  <div className="relative group">
    <div className="flex items-center space-x-3 py-2 px-4 bg-white hover:bg-gray-50 rounded-full  border border-gray-200 hover:border-gray-300 transition-all duration-200 cursor-pointer">
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
          <FiUsers className="w-4 h-4 text-blue-600" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-900 font-semibold">{profiles.length}</span>
          <span className="text-sm text-gray-500 hidden sm:block">
            {profiles.length === 1 ? 'Member' : 'Members'}
          </span>
        </div>
      </div>
      <div className="flex flex-col">
        <AiOutlineUp className="h-2 w-2 text-gray-400" />
        <AiOutlineDown className="h-2 w-2 text-gray-400" />
      </div>
    </div>

    <div className="absolute -left-9 lg:right-0 lg:top-9 mt-2 w-80 bg-white border border-gray-200 rounded-2xl hidden group-hover:block z-20 overflow-hidden backdrop-blur-sm">
      <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <h3 className="text-sm font-semibold text-gray-900">Team Members</h3>
        <p className="text-xs text-gray-500 mt-1">
          Select a profile to view analytics
        </p>
      </div>
      <div className="max-h-64 overflow-y-auto">
        {profiles.map((profile) => (
          <div
            key={profile.id || profile._id}
            onClick={() => onProfileChange(profile)}
            className="flex items-center justify-between p-4 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 cursor-pointer transition-all duration-200 group/item"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={
                    profile.profilePicture ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      profile.name,
                    )}&background=6366f1&color=fff&size=40`
                  }
                  alt={profile.name}
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-gray-100"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      profile.name,
                    )}&background=6366f1&color=fff&size=40`;
                  }}
                />
                <div
                  className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                    profile.isConnected === 'connected'
                      ? 'bg-green-400'
                      : profile.isConnected === 'invited'
                      ? 'bg-yellow-400'
                      : 'bg-gray-400'
                  }`}
                ></div>
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-sm font-medium text-gray-900 group-hover/item:text-gray-700">
                  {profile.name}
                </h4>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      profile.isConnected === 'connected'
                        ? 'bg-green-400'
                        : profile.isConnected === 'invited'
                        ? 'bg-yellow-400'
                        : 'bg-gray-400'
                    }`}
                  ></div>
                  <p
                    className={`text-xs font-medium ${
                      profile.isConnected === 'connected'
                        ? 'text-green-600'
                        : profile.isConnected === 'invited'
                        ? 'text-yellow-600'
                        : 'text-gray-500'
                    }`}
                  >
                    {profile.isConnected === 'connected'
                      ? 'Connected'
                      : profile.isConnected === 'invited'
                      ? 'Invited'
                      : 'Disconnected'}
                  </p>
                </div>
              </div>
            </div>
            <button
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white hover: rounded-lg transition-all opacity-0 group-hover/item:opacity-100"
              onClick={(e) => {
                e.stopPropagation();
                onCopy(profile.connectionToken);
              }}
              title="Copy connection token"
            >
              <FiCopy className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default MembersProfileDropDown;
