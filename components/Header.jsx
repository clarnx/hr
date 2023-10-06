import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Image from "next/image";
import logo from "../public/logo.webp";
import { AiFillShopping, AiOutlineClose, AiOutlineUser } from "react-icons/ai";
import { PiHeartStraight } from "react-icons/pi";
import { RiShoppingCartLine } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import RoundButton from "./RoundButton";
import Link from "next/link";
import Sidebar from "./Sidebar";
import { useRouter } from "next/router";
import { AiFillShop } from "react-icons/ai"
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { onOpen as openLoginModal } from "../store/loginModalSlice";
import { fetchDataFromApi } from "../libs/api";

// import { motion } from "framer-motion";
const Header = ({
  classStyles
}) => {
  // console.log("RENDERED");
  const [isMobile, setIsMobile] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [openOffer, setOpenOffer] = useState(true)
  const [isOpen, setIsOpen] = useState(true)
  // const { isOpen } = useSelector(state => state.headerOffer);
  const [show, setShow] = useState(isOpen ? "translate-y-[30px]" : 'translate-y-0')
  const dispatch = useDispatch();

  
 



  const { data: session } = useSession();
  const [userData, setUserData] = useState(null); // Replace with your user state logic
  const router = useRouter();

  const checkIsMobile = () => {
    if (window.innerWidth < 1024) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }

  useEffect(() => {

    if(session?.id){

      
      fetchDataFromApi(
        `api/users/${session?.id}?populate=*`
        ).then((res) => {
          setUserData(res);
        });
      }
  }, [session?.id]);

  useEffect(() => {

    if (window.innerWidth < 1024) {
      setIsMobile(true);
    }


    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);


  const controlNavbar = () => {

    if (window.scrollY > 30) {
      if (window.scrollY > lastScrollY && !isMobile) {
        setShow("-translate-y-[100px]");
      } else {
        setShow("shadow-xs");
      }
    } else {
      setShow(isOpen ? "translate-y-[30px]" : 'translate-y-0');
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    if (!isMobile) {
      window.addEventListener("scroll", controlNavbar);
    }
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };

  }, [lastScrollY, controlNavbar]);


  return isMobile ? (

    <header className="fixed top-0 self-start w-screen md:py-2 py-1 pb-2 px-6 md:px-16 lg:px-24 bg-white  flex justify-between items-center shadow-md z-[1000]" >
      <Sidebar />
      <Link href="/">
        <Image src={logo} width={100} height={100} alt="logo" />
      </Link>
      <div className="flex gap-2 items-baseline">
        {

          session?.id ? (<Link href="/my-profile"> <AiOutlineUser
            size={18}
          /> </Link>) : (
            <AiOutlineUser
        size={18}
        onClick={() => dispatch(openLoginModal())}
       />
          )
     
      }
        <RoundButton
          isMobile
          isCart={true}
          icon={RiShoppingCartLine}
        />
      </div>
    </header>

  ) : (
    <>
      {/* <div className={`w-screen z-[100000]  px-1/2 ${classStyles} flex justify-left px-24 items-center gap-x-4 py-2 bg-[#f9f8fd] list-none sticky top-0`}>
        <li>BULK ORDER</li>
        <li>TRACK ORDER</li>
      </div> */}
      <div className={`w-screen headerOffer flex items-center justify-center bg-sky-900 text-white text-center  ${isOpen ? "h-[30px]" : "h-0"} transition-all relative`}> USE CODE: <div className="text-bold text-red-300 mx-2"> NEW25 </div> Flat 25% Off on Every Products for <Link href="/my-profile" target="_Blank" className="text-red-300 mx-2">  New Users Only.</Link>
    <AiOutlineClose onClick={() => {
      setShow("translate-y-0")
      setIsOpen(false)
      }} className="absolute right-8 top-[6px] cursor-pointer text-white" />
      </div>
 
      <header className={`flex flex-col justify-center items-center list-none font-semibold fixed top-0 bg-white z-50 ${show} transition-all duration-300`}>

        <div
          className={`w-screen px-6 md:px-16 lg:px-24 flex justify-between items-center  cart-container py-4 transition-all duration-200`}
        >
          <div className="flex gap-8 items-center">
            <button onClick={() => router.push("/visit-factory")} className="border-2 border-black text-sm p-1 rounded-md px-4 transition-all duration-200 hover:bg-black hover:text-white cursor-pointer">
              VISIT FACTORY
            </button>

            <FiSearch
              onClick={() => router.push("/search")}
              className="cursor-pointer"
              size={24}
            />

          </div>

          <Link href="/">
            <Image alt="logo" width={250} height={250} src={logo} />
          </Link>

          <div className="flex items-center gap-0">
            
            <div>
              {userData? (
                // If user is logged in, show user name
                <div className="flex gap-0 items-center">
                <span className="flex flex-col text-xs text-right text-[#ff6536]">
                <span className="text-black text-sm">Hi, {userData?.username}</span>
                <span className="text-xs text-[#ff6536]">Welcome to Haroth Family</span>
                
                </span>
                <RoundButton isUser={true} icon={AiOutlineUser} />
                </div>
              ) : (
                // If user is not logged in, show the "Register Now" button
                <div className="flex gap-0 items-center">
                  <span className="flex flex-col text-xs text-right text-[#ff6536]">
                    <span className=" text-black">Register Now</span>
                    <span>Get Extra 25% OFF</span>
                  </span>
                  <RoundButton isUser={true} icon={AiOutlineUser} />
                </div>
              )}
            </div>
            <div className="flex gap-0 items-center">
              <span className="flex flex-col text-xs text-right text-[#ff6536]">
                <span className=" text-black">Opening</span>
                <span>Soon!</span>
              </span>
              <RoundButton onClick={() => {
                router.push("/coming-soon")
              }}
                icon={AiFillShop}

              />
            </div>
            <RoundButton onClick={() => {
              router.push("/my-profile")
            }} icon={PiHeartStraight} />
            <RoundButton
              isCart={true}
              icon={RiShoppingCartLine}
            />
          </div>
        </div>

        <Navbar />
      </header>
    </>
  );
};

export default Header;
