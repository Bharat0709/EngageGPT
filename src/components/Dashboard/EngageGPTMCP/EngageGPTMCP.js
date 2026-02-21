import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllMembers, addNewMember } from '@services/Members';
import { Icons } from '@utils/constantData/icons';
import { useNotifications } from '@components/Common/Notification';
import McpInfoModal from './McpInfoModal';
import MembersProfileDropDown from '../Global/MembersDropDown';
import AddMembersModal from '../Global/AddPeopleModal';
import ConnectionInfoModal from '../Home/ConnectionInfoModal';

const EngageGPTMCP = () => {
  const navigate = useNavigate();
  const message = useNotifications();
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const members = await getAllMembers();
        setProfiles(members);
        const connected = members.find((m) => m.isConnected === 'connected');
        const defaultProfile = connected || members[0] || null;
        setSelectedProfile(defaultProfile);

        if (defaultProfile && !defaultProfile.lastSyncedAt) {
          message.error('Please sync your profile to use the MCP server');
          navigate('/dashboard');
        }
      } catch (error) {
        message.error('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };
    fetchProfiles();
  }, [navigate]);

  const handleProfileChange = (profile) => {
    if (!profile.lastSyncedAt) {
      message.error('Please sync this profile to use the MCP server');
      navigate('/dashboard');
      return;
    }
    setSelectedProfile(profile);
  };

  const mcpConfig = {
    mcpServers: {
      engagegpt: {
        command: 'npx',
        args: ['-y', 'mcp-remote@latest', 'https://mcp.engagegpt.in/mcp/sse'],
      },
    },
  };

  const copyToClipboard = (text, type = 'text') => {
    navigator.clipboard.writeText(text);
    message.success(`${type} copied to clipboard!`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Icons.Loader className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  const isSynced = selectedProfile?.lastSyncedAt;

  return (
    <div className="px-4 py-4 bg-[#fafafa] min-h-screen mx-auto animate-in fade-in duration-500">
      <div className="flex justify-between gap-4 items-center rounded-2xl ">
        <div className="flex justify-between w-full items-center gap-6">
          <div className="flex flex-col">
            <h1 className="lg:text-xl ovo-regular font-bold text-gray-900 flex items-center gap-2">
              {/* <Icons.Code className="text-blue-600" /> */}
              EngageGPT MCP Server
            </h1>
          </div>
          {profiles.length != 0 && (
            <div className="mr-4 flex items-center gap-4">
              <MembersProfileDropDown
                profiles={profiles}
                selectedProfileId={selectedProfile?.id || selectedProfile?._id}
                onProfileChange={handleProfileChange}
                onCopy={(token) => {
                  copyToClipboard(token, 'Token');
                }}
              />
            </div>
          )}
        </div>
      </div>

      {!isSynced && (
        <div className="bg-amber-50 mt-2 border border-amber-200 p-4 rounded-xl flex gap-3 text-amber-800">
          <Icons.Alert className="shrink-0" size={20} />
          <div className="text-sm flex flex-row gap-2">
            <p className="font-semibold geist p-0 m-0 ">Context Data Missing</p>
            <p className="opacity-90 p-0 m-0 geist">
              We need your LinkedIn post history to generate your writing DNA.
              Please sync your posts in the Dashboard first.
            </p>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 mt-6 gap-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg geist  font-semibold text-gray-800 flex items-center gap-2">
              <Icons.Settings size={20} className="text-gray-400" />
              1. Claude Desktop Config
            </h2>
            <div className="relative group">
              <div className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() =>
                    copyToClipboard(JSON.stringify(mcpConfig, null, 2), 'JSON')
                  }
                  className="p-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors flex items-center gap-2 text-xs"
                >
                  <Icons.Copy size={14} />
                  Copy JSON
                </button>
              </div>
              <pre className="bg-gray-950 text-gray-300 p-6 rounded-2xl overflow-x-auto text-xs font-mono leading-relaxed border border-gray-800 shadow-inner">
                {JSON.stringify(mcpConfig, null, 2)}
              </pre>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg geist font-semibold text-gray-800 flex items-center gap-2">
              <Icons.Shield size={20} className="text-blue-500" />
              2. Your Connection Token
            </h2>
            <div className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm flex items-center justify-between group">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
                  TOKEN FOR {selectedProfile?.name?.toUpperCase()}
                </span>
                <code className="text-sm font-mono text-gray-700">
                  {selectedProfile?.connectionToken || '---'}
                </code>
              </div>
              <button
                onClick={() =>
                  copyToClipboard(selectedProfile?.connectionToken, 'Token')
                }
                className="p-3 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition-all"
              >
                <Icons.Copy size={18} />
              </button>
            </div>
            <p className="text-xs text-gray-400">
              This token is required for authentication when you connect to our
              server in Claude AI.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1.5 transition-colors underline-offset-4 hover:underline"
          >
            <Icons.Info size={16} />
            How to add this to Claude?
          </button>
        </div>

        <div className="space-y-4 h-fit">
          <h2 className="text-lg geist font-semibold text-gray-800 flex items-center gap-2">
            <Icons.Sparkles size={20} className="text-amber-500" />
            3. Sample Prompt
          </h2>
          <div className="bg-blue-50/50 border border-blue-100 p-6 rounded-2xl space-y-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-50 relative group">
              <button
                onClick={() =>
                  copyToClipboard(
                    'Using my写作风格 (writing persona) from EngageGPT, draft a new LinkedIn post about the impact of AI on specialized software engineering careers.',
                  )
                }
                className="absolute right-3 top-3 p-1.5 text-gray-400 hover:text-blue-600 transition-colors"
              >
                <Icons.Copy size={16} />
              </button>
              <p className="text-gray-700 text-sm italic pr-8">
                "Using my writing persona from EngageGPT, draft a new LinkedIn
                post about the impact of AI on specialized software engineering
                careers."
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-semibold text-blue-800 uppercase tracking-wider">
                What happens next?
              </p>
              <ul className="text-sm text-blue-700 space-y-2 list-none p-0">
                <li className="flex gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-300 mt-1.5 shrink-0" />
                  Claude fetches your top 25 high-engagement posts via our MCP
                  server.
                </li>
                <li className="flex gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-300 mt-1.5 shrink-0" />
                  It analyzes your hooks, paragraph spacing, emoji usage, and
                  unique voice.
                </li>
                <li className="flex gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-300 mt-1.5 shrink-0" />
                  Generates fresh content that feels authentically yours.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <McpInfoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <ConnectionInfoModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
      />
    </div>
  );
};

export default EngageGPTMCP;
