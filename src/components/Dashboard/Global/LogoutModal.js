import React from 'react';
import LogoutButton from '../../Logout';
import logoutImage from '@assets/images/logout.png';

const LogoutModal = ({ isVisible, onClose, onConfirm }) => {
  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 overflow-hidden  bg-black bg-opacity-60 flex items-center justify-center p-4 backdrop-blur-sm transition-opacity z-50"
      onClick={onClose}
    >
      <div
        className="bg-white lg:w-1/4 w-11/12 flex flex-col rounded-3xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          className="h-22 w-20 mx-auto mt-8 mb-2"
          src={logoutImage}
          alt="logout"
        />
        <h2 className="text-md  mt-4 mb-8 geist  px-4 text-center ">
          Are you sure you want to log out?
        </h2>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onClose}
            className=" geist uppercase  rounded-b-3xl hover:bg-gray-50 bg-gray-100 w-1/2 border-none  text-sm"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className=" py-1 px-4 w-1/2 text-center geist uppercase  rounded-br-3xl hover:bg-red-500 bg-red-600"
          >
            <LogoutButton />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
