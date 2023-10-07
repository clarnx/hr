import React from "react";
import logo from "../public/logo.webp";
import Image from "next/image";
import { FaLocationArrow } from "react-icons/fa";
import {GoMail} from "react-icons/go"
import  {FaMobileAlt} from "react-icons/fa"
import appStore from "../public/available-app-store.png"
import googlePlay from "../public/google-play.png"
import Link from "next/link";
import ContactUs from "../pages/contactUs";
const Footer = () => {


  return (
    <footer className="min-h-min w-screen max-w-screen lg:px-24 md:px-16 px-6 py-12 grid lg:grid-cols-4 grid-cols-2 lg:gap-8 gap-4 bg-[#f9f8fd] text-[#777777] place-items-start place-content-start -mb-12 shadow-md border-t border-t-gray-100">


      {/* FIRST COLUMN */}
      <ul className="flex flex-col gap-y-4 list-none sm:text-sm text-xs items-start grid-flow-row">
      <li>
        <Image src={logo} width={200} height={200} alt="logo" className="mb-4" />
      </li>
        <li className="flex justify-center items-center gap-2">
          <FaLocationArrow className="text-[#777777]" />
          H-54, G/F, JAITPUR EXTN-II
        </li>

        <li className="flex justify-center items-center gap-2">
          <FaLocationArrow className="text-[#777777]" /> NEW DELHI, DELHI
        </li>
        <li className="flex justify-center items-center gap-2">
          <GoMail className="text-[#777777]" />{`Fax: (91) 9868489009`}
        </li>
        <li className="flex justify-center items-center gap-2">
          <FaMobileAlt className="text-[#777777]" />{`Phone: (91) 9868489009`}
        </li>

      </ul>
      {/* END OF FIRST COLUMN */}
      
      {/* SECOND COLUMN START */}

      <ul className="flex flex-col gap-2 list-none md:text-sm text-xs items-start grid-flow-row">
        <h5 className="flex justify-center items-center mb-4 md:text-lg text-sm text-black font-semibold">
          OUR COMING STORES
        </h5>
        <li className="flex justify-center items-center gap-2 hover:text-black transition-all duration-200 cursor-pointer">
          Bangalore
        </li>
        <li className="flex justify-center items-center gap-2 hover:text-black transition-all duration-200 cursor-pointer">
          Ahmedabad
        </li>
        <li className="flex justify-center items-center gap-2 hover:text-black transition-all duration-200 cursor-pointer">
          Indore
        </li>
        <li className="flex justify-center items-center gap-2 hover:text-black transition-all duration-200 cursor-pointer">
          Kolkata
        </li>
        <li className="flex justify-center items-center gap-2 hover:text-black transition-all duration-200 cursor-pointer">
          Hydrabad
        </li>
      </ul>
      {/* SECOND COLUMN END */}


      {/* THIRD COLUMN START */}


      <ul className="flex flex-col gap-2 list-none md:text-sm text-xs items-start self-start">
        <h5 className="flex justify-center items-center mb-4 md:text-lg text-sm text-black font-semibold">
          USEFUL LINKS
        </h5>
        <li className="flex justify-center items-center gap-2 hover:text-black transition-all duration-200 cursor-pointer">
        <Link href={'/policies'}>

          Privacy Policy
        </Link>
        </li>
        <li className="flex justify-center items-center gap-2 hover:text-black transition-all duration-200 cursor-pointer">
        <Link href={"/policies"}>
          Returns & Refunds
        </Link>
        </li>
        <li className="flex justify-center items-center gap-2 hover:text-black transition-all duration-200 cursor-pointer">
          Terms & Conditions
        </li>
        <li className="flex justify-center items-center gap-2 hover:text-black transition-all duration-200 cursor-pointer">
          <Link href={"/ContactUs"}>
          Contact Us
          </Link>
        </li>
        <li className="flex justify-center items-center gap-2 hover:text-black transition-all duration-200 cursor-pointer">
          <Link href={"https://blog.haroth.com"} target="_blank">
          Latest News
          </Link>
        </li>
      </ul>

      {/* THIRD COLUMN END */}


      {/* FOURTH COLUMN START */}


      <ul className="flex flex-col gap-2 list-none text-sm items-start">
        <h5 className="flex justify-center items-center mb-4 md:text-lg text-sm text-black font-semibold">
          AVAILABLE ON:
        </h5>
        <li className="flex items-center justify-between gap-2 flex-wrap">
          <div onClick={() => open('https://play.google.com/store/apps/details?id=com.haroth&pli=1')}>
        <Image className="cursor-pointer" src={appStore} width={150} height={150} alt="Available on App Store" />
        <Image className="cursor-pointer" src={googlePlay} width={150} height={150} alt="Available on Google Play" />
        </div></li>
      </ul>

      {/* FOURTH COLUMN END */}

      <hr className="w-screen relative lg:-left-32 md:-left-12 -left-6" />


      <div className="lg:col-span-4 col-span-2 text-center text-gray-700 place-content-center text-xs place-items-center place-self-center pb-4">
        <p> <strong>HAROTH.COM  </strong>2022 OWNED BY <strong>TAK DECOR PRIVATE LIMITED.</strong> PREMIUM FURNITURE SOLUTIONS.</p>
      </div>

    </footer>
  );
};

export default Footer;
