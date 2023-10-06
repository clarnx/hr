import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router'; // Import the useRouter hook
import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const OfferPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter(); // Get the current route using useRouter

  useEffect(() => {
    // Check if the current route is not '/cart' or '/checkout' before showing the popup
    if (router.pathname !== '/cart' && router.pathname !== '/checkout') {
      let timeout = setTimeout(() => {
        setShowPopup(true);
      }, 5000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [router.pathname]); // Re-run the effect whenever the route changes

  return showPopup ? (
    <div className="fixed w-full h-full top-0 left-0 bg-black/50 flex items-center justify-center z-[100000]">
      <div className="relative">
        <div
          onClick={() =>
            open('https://play.google.com/store/apps/details?id=com.haroth&pli=1')
          }
          className="cursor-pointer"
        >
          <Image
            src="/popup_7.webp"
            width={350}
            height={600}
            className=""
            alt="Offer Image"
          />
        </div>
        <AiOutlineClose
          onClick={() => {
            setShowPopup(false);
          }}
          size={35}
          className="absolute top-2 right-2 text-white bg-gray-400 p-2 cursor-pointer rounded-full"
        />
      </div>
    </div>
  ) : null;
};

export default OfferPopup;
