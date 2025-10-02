import EngageGPTLogo from '@assets/images/EngageGPTLogoIocn.png';
import { Link } from 'react-router-dom';

export const AuthHeader = ({ heading }) => {
  return (
    <div className="auth-header flex flex-col gap-6 mb-6 m-4">
      <Link to="/">
        <div className="w-full text-xl flex items-center gap-2 justify-center">
          <img
            src={EngageGPTLogo}
            alt="EngageGPT Logo"
            className="flex w-10 h-10"
          />
          EngageGPT
        </div>
      </Link>
      <h2 className="text-2xl text-center font-semibold text-white">
        {heading}
      </h2>
    </div>
  );
};
