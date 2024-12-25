// NotFound.js
import React from 'react';
import {useNavigate} from 'react-router-dom';
import NotFound404 from '../assets/images/404NotFound.png'
import EngageGPTLogo from '../assets/images/EngageGPTLogo.png'

const NotFound = () => {

    const navigate = useNavigate();

    const goToHome = () => {
      navigate('/');
    };

    return (
      <div className='flex flex-col my-auto gap-4 px-10 py-12 mulish-normal items-center justify-center'>
        <img className='h-10 mb-12' src={EngageGPTLogo} alt={'Page Not Found'}/>
        <img className='h-24' src={NotFound404} alt={'Page Not Found'}/>
        <p className='text-center'>The page you are looking for doesn't exist or has been moved.</p>
        <button
          onClick={goToHome}
          style={{
            marginTop: '10px',
            padding: '10px 20px',
            backgroundColor: 'white',
            color: 'black',
            border: '1px solid black',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Go to Home
        </button>
      </div>
    )
  }
;

export default NotFound;
