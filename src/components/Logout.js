import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../redux/auth/authActions';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

const LogoutButton = ({ isOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutAction());
    navigate('/login');
  };

  return (
    <button
      className={`flex items-center gap-2 py-1 rounded-md`}
      onClick={handleLogout}
    >
      <FiLogOut size={16} className="text-white" />
      <span className={`text-white text-sm`}>Logout</span>
    </button>
  );
};

export default LogoutButton;
