import EngageGPTLogoIcon from '@assets/images/EngageGPTLogoIocn.png';
import EngageGPTLogo from '@assets/images/EngageGPTLogo.png';
import { Icons } from '@utils/constantData/icons';

export const Sidebarheader = ({ isOpen, toggleSidebar, isMobile }) => {
  return (
    <div
      className={`flex items-center scrollbar-hide justify-between pt-2 pb-4 ${
        isOpen ? 'pl-6 pr-2' : 'pr-2 pl-4'
      } border-b lg:border-b-0`}
    >
      <a className="h-10 w-40 min-w-10 mr-2 mt-2 " href="https://engagegpt.in">
        {isOpen ? (
          <img
            src={EngageGPTLogo}
            className="h-10 w-40 min-w-10 rounded-full"
            alt="EngageGPT Logo"
          />
        ) : (
          <img src={EngageGPTLogoIcon} className="h-10" alt="EngageGPT Logo" />
        )}
      </a>
      <button
        onClick={toggleSidebar}
        className="text-gray-200 transform transition-transform duration-500"
      >
        <Icons.ChevronLeft
          size={24}
          className={`transform p-1 transition-transform duration-500 ${
            isMobile ? 'flex' : 'flex'
          } ${
            isOpen
              ? 'rotate-0 bg-white text-black rounded-full'
              : 'bg-white text-black rounded-full rotate-180'
          }`}
        />
      </button>
    </div>
  );
};
