import { useDispatch } from 'react-redux';
import { logoutAction } from '../redux/auth/authActions';
import { useNavigate } from 'react-router-dom';
import { Icons } from '@utils/constantData/icons';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutAction());
    navigate('/login');
  };

  return (
    <button
      className={`flex items-center bg-transparent w-full px-1 gap-2 py-2 rounded-md`}
      onClick={handleLogout}
    >
      <Icons.LogOut size={16} className="text-white" />
      <span className={`text-white text-sm`}>Logout</span>
    </button>
  );
};

export default LogoutButton;
