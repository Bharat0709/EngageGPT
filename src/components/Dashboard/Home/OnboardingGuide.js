import AddMembersModal from '../Global/AddPeopleModal';
import { OnboardingSteps } from '@assets/data/onBoardingSteps';
import { useNotifications } from '@components/Common/Notification';
import { Icons } from '@utils/constantData/icons';
import { Copy } from '@utils/copyText';
import { connectLinkedIn } from '@utils/connectLinkedIn';
import { useEffect } from 'react';
import { getCalApi } from '@calcom/embed-react';

const OnboardingGuide = ({
  onAddProfile,
  isModalOpen,
  onCloseModal,
  onSubmitModal,
  invitedProfiles = [],
  selectedProfile = null,
}) => {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: '30min' });
      cal('ui', { hideEventTypeDetails: false, layout: 'month_view' });
    })();
  }, []);
  const message = useNotifications();
  const isProfileAdded = invitedProfiles.length > 0 || selectedProfile !== null;

  const isExtensionInstalled =
    invitedProfiles?.some((profile) => profile.isConnected === 'connected') ||
    selectedProfile?.isConnected === 'connected';

  const isLinkedInConnected =
    selectedProfile?.isLinkedinConnected ||
    invitedProfiles.some((profile) => profile.isLinkedinConnected);

  const isProfileSynced = selectedProfile?.lastSyncedAt;

  const stepsCompletion = {
    'Add Profile': isProfileAdded,
    'Install Chrome Extension and Connect your profile using conection token':
      isExtensionInstalled,
    'Sync your LinkedIn Profile': isProfileSynced,
  };

  const handleCopyToken = (token) => {
    Copy(token);
    message.success('Connection token copied');
  };
  const stepsUnlocked = {
    'Add Profile': true, // First step is always unlocked
    'Install Chrome Extension and Connect your profile using conection token':
      isProfileAdded, // Only unlocked if profile is added
    'Sync your LinkedIn Profile': isProfileAdded && isExtensionInstalled, // Only unlocked if previous steps are completed
  };

  return (
    <div className="container  px-4 lg:py-4 py-2 max-w-8xl animate-fade-in">
      {/* <UpdateBanner/> */}
      <div className="text-center mb-2 border border-gray-600">
        <img
          src="/banner.svg"
          alt="Banner-EngageGPT"
          className="mx-auto w-full max-h-1/2"
        />
      </div>
      <div className="bg-white lg:hidden flex flex-col mb-2 shadow-sm border border-gray-600 p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">
          Why EngageGPT?
        </h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Icons.Target className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium m-0 text-slate-800 text-sm">
                Targeted Engagement
              </p>
              <p className="text-slate-600 m-0 text-xs">
                AI identifies the best opportunities
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Icons.TrendingUp className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium mb-0 text-slate-800 text-sm">
                Boost Visibility
              </p>
              <p className="text-slate-600 mb-0 text-xs">
                Increase your profile views by 3x
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Icons.Zap className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium mb-0 text-slate-800 text-sm">
                Save Time
              </p>
              <p className="text-slate-600 mb-0 text-xs">
                Automate routine engagement tasks
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-600 p-6 mb-2">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1">
            <div className="flex flex-col lg:flex-row justify-between items-start">
              <div className=" flex flex-col items-start mb-6">
                <h2 className="text-2xl ovo-regular font-semibold text-gray-800 mb-2">
                  Get Started in Minutes
                </h2>
                <p className="text-gray-600 geist lg:text-md text-sm max-w-[40rem] mb-6">
                  Follow these simple steps to set up your account and start
                  maximizing your LinkedIn engagement.
                </p>
                <p className="m-0 bg-yellow-200">
                  Refresh the page once each step is complete
                  {isProfileAdded && (
                    <span> | SCROLL DOWN FOR CONNECTION TOKEN</span>
                  )}
                </p>
              </div>

              <button
                data-cal-namespace="30min"
                data-cal-link="engagegpt-pbr2vh/30min"
                data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
                className="px-6 cursor-pointer py-2 lg:text-md text-md font-medium border  border-gray-300 bg-white text-black w-fit"
              >
                Book a Demo
              </button>
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
                    } rounded-full  h-10 w-10 flex items-center justify-center flex-shrink-0`}
                  >
                    <step.icon
                      className={
                        stepsCompletion[step.title]
                          ? 'text-green-600'
                          : stepsUnlocked[step.title]
                            ? 'text-linkedin'
                            : 'text-gray-400 '
                      }
                      size={20}
                    />
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`font-medium  ovo-regular mt-2 lg:mt-0 ${
                        stepsUnlocked[step.title]
                          ? 'text-gray-800'
                          : 'text-gray-400'
                      } ${stepsCompletion[step.title] && 'line-through'}`}
                    >
                      {step.title}{' '}
                    </h3>
                    <p
                      className={`${
                        stepsUnlocked[step.title]
                          ? 'text-gray-600'
                          : 'text-gray-400'
                      } ${stepsCompletion[step.title] && 'line-through'} lg:flex hidden text-sm mt-1`}
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
        <div className="bg-white border border-gray-600 p-6">
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
              onClick={connectLinkedIn}
              className="btn-primary flex items-center gap-2 whitespace-nowrap px-6 py-2 text-sm font-medium bg-white border border-black text-black w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
            >
              <Icons.LinkedIn className="text-blue-900" size={20} />
              Connect
            </button>
          </div>
        </div>
      )}

      {invitedProfiles.length > 0 && (
        <div className="bg-white border border-gray-600  p-6 mt-2">
          <h3 className="font-semibold ovo-regular text-gray-800 text-lg mb-4">
            Generated Connection Token(s) & Invited Profiles
          </h3>
          <div className="space-y-4">
            {invitedProfiles.map((profile) => (
              <div
                key={profile.id}
                className="flex flex-col md:flex-row justify-between items-center p-4 border border-gray-300"
              >
                <div className="flex items-center gap-3 mb-3 md:mb-0">
                  <img
                    src={profile.profilePicture}
                    alt={`${profile.name}'s profile`}
                    className="w-12 h-12 rounded-full border border-gray-300"
                  />
                  <div>
                    <h4 className="font-medium m-0 p-0  text-gray-800">
                      {profile.name}
                    </h4>
                    <p className="text-sm m-0 p-0 text-gray-600">
                      {profile.email}
                    </p>
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
                  <div className="copy-token flex items-center items-center font-semibold w-full min-w-98 flex py-1   pl-3 pr-2 text-gray-800 text-md">
                    <p className="m-0 w-full mr-1 p-0">Connection Token: </p>
                    <button
                      className="flex gap-2 items-center w-full text-gray-700  hover:text-black"
                      onClick={() => handleCopyToken(profile.connectionToken)}
                    >
                      <span className="text-[#004182] bg-blue-100/50 px-2 py-0.5 rounded text-xs font-mono">
                        {profile.connectionToken?.substring(0, 8)}*****
                      </span>
                      <Icons.Copy size={16} />
                      Copy
                    </button>
                  </div>
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
