import AddMembersModal from '../Global/AddPeopleModal';
import { OnboardingSteps } from '../../../assets/data/onBoardingSteps';
import { AiFillLinkedin } from 'react-icons/ai';
import { FiEye, FiCopy } from 'react-icons/fi';
import { message } from 'antd';

const OnboardingGuide = ({
  onAddProfile,
  isModalOpen,
  onCloseModal,
  onSubmitModal,
  invitedProfiles = [],
  selectedProfile = null,
}) => {
  const handleConnectLinkedIn = () => {
    const authUrl = process.env.REACT_APP_LINKEDIN_AUTH_URL;
    window.location.href = authUrl;
  };

  const handleCopy = (token) => {
    navigator.clipboard.writeText(token);
    message.success('Connection token copied!');
  };

  const isProfileAdded = invitedProfiles.length > 0 || selectedProfile !== null;
  const isExtensionInstalled =
    invitedProfiles?.some((profile) => profile.isConnected === 'connected') ||
    selectedProfile?.isConnected === 'connected';
  const isLinkedInConnected =
    selectedProfile?.isLinkedinConnected ||
    invitedProfiles.some((profile) => profile.isLinkedinConnected);
  const isProfileSynced = selectedProfile?.lastSyncedAt;

  // Calculate which steps are completed
  const stepsCompletion = {
    'Add Profile': isProfileAdded,
    'Install Chrome Extension and Connect your profile using conection token':
      isExtensionInstalled,
    'Sync your LinkedIn Profile': isProfileSynced,
  };

  // Determine which steps are unlocked based on previous step completion
  const stepsUnlocked = {
    'Add Profile': true, // First step is always unlocked
    'Install Chrome Extension and Connect your profile using conection token':
      isProfileAdded, // Only unlocked if profile is added
    'Sync your LinkedIn Profile': isProfileAdded && isExtensionInstalled, // Only unlocked if previous steps are completed
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl animate-fade-in">
      <div className="text-center mb-8 mt-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Welcome to EngageGPT
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Your AI-powered LinkedIn engagement platform. Let's get you set up for
          success!
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-600 p-8 mb-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div className=" flex flex-col items-start mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Get Started in Minutes
                </h2>
                <p className="text-gray-600 max-w-[40rem] mb-6">
                  Follow these simple steps to set up your account and start
                  maximizing your LinkedIn engagement.
                </p>
                <p>Note: Refresh once each step is complete</p>
              </div>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="youtube.com"
                className="hidden justify-center items-center"
              >
                <div className="bg-white flex items-center justify-center">
                  <div className="px-6 py-2 border border-black text-sm font-medium bg-white text-black w-fit transition-all shadow-[5px_5px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]">
                    View Tutorial
                  </div>
                </div>
              </a>
            </div>

            <div className="space-y-6">
              {OnboardingSteps.map((step, index) => (
                <div
                  key={index}
                  className="flex lg:flex-row flex-col items-start justify-start gap-4"
                >
                  <div
                    className={`${
                      stepsCompletion[step.title]
                        ? 'bg-green-100'
                        : stepsUnlocked[step.title]
                        ? 'bg-linkedin/10'
                        : 'bg-gray-200' 
                    } rounded-full bg-green-100 h-10 w-10 flex items-center justify-center flex-shrink-0`}
                  >
                    <step.icon
                      className={
                        stepsCompletion[step.title]
                          ? 'text-green-600'
                          : stepsUnlocked[step.title]
                          ? 'text-linkedin'
                          : 'text-gray-400'
                      }
                      size={20}
                    />
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`font-medium mt-2 lg:mt-0 ${
                        stepsUnlocked[step.title]
                          ? 'text-gray-800'
                          : 'text-gray-400'
                      }`}
                    >
                      {step.title}{' '}
                      {stepsCompletion[step.title] && (
                        <span className="text-green-600">✓</span>
                      )}
                    </h3>
                    <p
                      className={`${
                        stepsUnlocked[step.title]
                          ? 'text-gray-600'
                          : 'text-gray-400'
                      } lg:flex hidden text-sm mt-1`}
                    >
                      {step.description}
                    </p>
                  </div>
                  {step.action === 'Add Profile' ? (
                    <button
                      onClick={onAddProfile}
                      className={`btn-primary whitespace-nowrap self-center lg:w-fit w-full px-6 py-2 text-md lg:text-sm h-fit rounded-none font-medium ${
                        stepsCompletion[step.title]
                          ? 'bg-green-600'
                          : 'bg-[#004182]'
                      } text-white w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]`}
                    >
                      {stepsCompletion[step.title] ? 'Add More' : step.action}
                    </button>
                  ) : (
                    <a
                      href={stepsUnlocked[step.title] ? step.link : '#'}
                      onClick={(e) => {
                        if (!stepsUnlocked[step.title]) {
                          e.preventDefault();
                          message.warning(
                            `Please complete the previous step first: ${
                              OnboardingSteps[index - 1].title
                            }`,
                          );
                        }
                      }}
                      target={
                        stepsUnlocked[step.title] &&
                        step.link.startsWith('http')
                          ? '_blank'
                          : '_self'
                      }
                      rel={
                        stepsUnlocked[step.title] &&
                        step.link.startsWith('http')
                          ? 'noopener noreferrer'
                          : ''
                      }
                      className={`px-6 py-2 text-md lg:text-sm h-fit rounded-none font-medium ${
                        stepsCompletion[step.title]
                          ? 'bg-green-600'
                          : stepsUnlocked[step.title]
                          ? 'bg-[#004182]'
                          : 'bg-gray-400 cursor-not-allowed'
                      } text-white w-fit transition-all ${
                        stepsUnlocked[step.title]
                          ? 'shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]'
                          : ''
                      }`}
                    >
                      {stepsCompletion[step.title]
                        ? 'Completed'
                        : stepsUnlocked[step.title]
                        ? step.action
                        : 'Locked'}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isProfileAdded && !isLinkedInConnected && isExtensionInstalled && (
        <div className="bg-white border border-gray-600 rounded-xl p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-gray-800 text-lg">
                Ready to boost your LinkedIn presence?
              </h3>
              <p className="text-gray-600">
                Connect your profile now and start leveraging the power of AI.
              </p>
            </div>
            <button
              onClick={handleConnectLinkedIn}
              className="btn-primary flex items-center gap-2 whitespace-nowrap px-6 py-2 text-sm font-medium bg-white border border-black text-black w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
            >
              <AiFillLinkedin className="text-blue-900" size={20} />
              Connect
            </button>
          </div>
        </div>
      )}

      {invitedProfiles.length > 0 && (
        <div className="bg-white border border-gray-600 rounded-xl p-6 mt-6">
          <h3 className="font-semibold text-gray-800 text-lg mb-4">
            Invited Profiles
          </h3>
          <div className="space-y-4">
            {invitedProfiles.map((profile) => (
              <div
                key={profile.id}
                className="flex flex-col md:flex-row justify-between items-center p-4 border border-gray-300 rounded-lg"
              >
                <div className="flex items-center gap-3 mb-3 md:mb-0">
                  <img
                    src={profile.profilePicture}
                    alt={`${profile.name}'s profile`}
                    className="w-10 h-10 rounded-full border border-gray-300"
                  />
                  <div>
                    <h4 className="font-medium text-gray-800">
                      {profile.name}
                    </h4>
                    <p className="text-sm text-gray-600">{profile.email}</p>
                    <span
                      className={`text-xs ${
                        profile.isConnected === 'connected'
                          ? 'text-green-600'
                          : 'text-orange-500'
                      }`}
                    >
                      •{' '}
                      {profile.isConnected === 'connected'
                        ? 'Connected'
                        : 'Invited'}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="copy-token items-center font-semibold flex py-1 bg-sky-50 rounded-lg pl-3 pr-2 text-gray-800 text-sm">
                    Connection Token
                    <button
                      onClick={() => message.info(profile.connectionToken)}
                      className="ml-2 text-gray-800 hover:text-black"
                    >
                      <FiEye size={16} />
                    </button>
                    <button
                      className="ml-2 text-gray-800 hover:text-black"
                      onClick={() => handleCopy(profile.connectionToken)}
                    >
                      <FiCopy size={16} />
                    </button>
                  </div>
                  <button
                    onClick={handleConnectLinkedIn}
                    disabled={profile.isLinkedinConnected}
                    className={`text-sm border-gray-400 font-semibold px-3 text-black flex items-center gap-2 p-2 rounded-lg ${
                      profile.isLinkedinConnected
                        ? 'bg-green-400 text-white font-semibold cursor-not-allowed'
                        : 'bg-gray-100'
                    }`}
                  >
                    {profile.isLinkedinConnected ? (
                      <AiFillLinkedin className="text-white" size={20} />
                    ) : (
                      <AiFillLinkedin
                        className={`${'text-sky-900'}`}
                        size={20}
                      />
                    )}
                    {profile.isLinkedinConnected ? 'Connected' : 'Connect'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <AddMembersModal
        isOpen={isModalOpen}
        onClose={onCloseModal}
        onSubmit={onSubmitModal}
      />
    </div>
  );
};

export default OnboardingGuide;
