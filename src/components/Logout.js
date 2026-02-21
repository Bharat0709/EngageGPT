import { useDispatch } from 'react-redux';
import { logoutAction } from '../redux/auth/authActions';
import { useNavigate } from 'react-router-dom';
import { Icons } from '@utils/constantData/icons';
import { useNotifications } from './Common/Notification';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const message = useNotifications();

  const handleLogout = async () => {
    dispatch(logoutAction());
    navigate('/login');
    message.success('Logged out successfully!');
  };

  return (
    <button
      className={`flex items-center justify-center w-full px-1 gap-2 py-2`}
      onClick={handleLogout}
    >
      <Icons.LogOut size={16} className="text-white" />
      <span className={`text-white geist uppercase text-sm text-center`}> Yes, Logout</span>
    </button>
  );
};

export default LogoutButton;
