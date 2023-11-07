import React from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { onOpen } from '../store/loginModalSlice';

const SignupBar = () => {
  const imageSrc = '/category_1.webp';
  const imageWidth = '2000px';
  const imageHeight = '1000px';
  const dispatch = useDispatch();

  const openLogin = () => {
    dispatch(onOpen());
  };

  return (
    <div className="w-screen px-6 md:px-16 lg:px-24 mb-8">
      <img
        src={imageSrc}
        alt="Custom Image"
        width={imageWidth}
        height={imageHeight}
        onClick={openLogin}
        style={{ cursor: 'pointer' }}
        className="hidden md:block" // Hide on screens smaller than 'md' (medium) width
      />
    </div>
  );
};

export default SignupBar;
