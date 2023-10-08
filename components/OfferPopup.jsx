import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import Cookies from 'js-cookie'; // Import js-cookie

const OfferPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if the popup has been closed within the last 6 hours
    const lastClosedTime = Cookies.get('popupClosedTime');
    if (!lastClosedTime || Date.now() - Number(lastClosedTime) > 6 * 60 * 60 * 1000) {
      // If it hasn't been closed in the last 6 hours, show the popup
      let timeout = setTimeout(() => {
        setShowPopup(true);
      }, 5000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, []);

  const handleClosePopup = () => {
    // Set a cookie with the current timestamp when the popup is closed
    Cookies.set('popupClosedTime', String(Date.now()), { expires: 0.25 }); // Expires in 6 hours (0.25 days)

    setShowPopup(false);
  };

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
          onClick={handleClosePopup}
          size={35}
          className="absolute top-2 right-2 text-white bg-gray-400 p-2 cursor-pointer rounded-full"
        />
      </div>
    </div>
  ) : null;
};

export default OfferPopup;
