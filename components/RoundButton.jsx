import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onOpen as openLoginModal } from "../store/loginModalSlice";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const RoundButton = ({
  bgColor,
  icon: Icon,
  isCart,
  isUser,
  isMobile,
  onClick,

}) => {
  const [componentDidMount, setComponentDidMount] = useState(false)
  const [isOpen, setIsOpen] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    setComponentDidMount(true);
  }, [])
  const cart = useSelector((state) => state.cart)

  
  const loginModal = useSelector((state) => state.loginModal);
  const dispatch = useDispatch();

  

  if (isCart) {


    if(componentDidMount) {
      
      
      return (
        <Link href="/cart">
        <button
          className={` rounded-full p-2 bg-[${bgColor}]  text-gray-900 relative hover:opacity-60 transition hover:scale-105`}
        >
          <Icon size={isMobile ? 18 : 24} />
          <div className="absolute bg-white w-4 h-4  lg:w-6 lg:h-6 flex items-center justify-center md:-right-2 md:-top-2 top-0 -right-2 rounded-full lg:text-sm text-xs text-[#ff6536] drop-shadow-[2px_2px_6px_rgba(0,0,0,0.4)]">
            {cart.cartItems.length}
          </div>
        </button>
      </Link>
    );
  } else {
    return null
  }
  }

  if (isUser) {
   


    const toggleOpen = () => {
      setIsOpen((prev) => !prev);
      // console.log();
    };

    return (
      <div className="relative" onMouseEnter={toggleOpen} onMouseLeave={toggleOpen}>
        <button
          onClick={toggleOpen}
          className={`relative rounded-full p-2 bg-[${bgColor}]  text-gray-900 hover:opacity-60 transition hover:scale-105
          drop-shadow-none
          hover:drop-shadow-lg`}
        >
          <Icon size={30} />
        </button>
        {isOpen && !session && (
          <div className="absolute w-56 min-h-min top-12 border border-gray-200 right-0 z-40 bg-white text-gray-600 shadow-md flex flex-col gap-4 items-center justify-center">
            
            <p
              onClick={() => dispatch(openLoginModal())}
              className="flex-1 flex flex-col items-center gap-2 px-2 py-2 w-full cursor-pointer hover:text-black rounded-lg"
            >
            <span className=" font-semibold w-full">Namaskar 🙏</span>
            <span className=" text-xs font-semibold w-full">Register Now & Get 25% Discounts</span>
            <button onClick={() => dispatch(openLoginModal())} className="bg-[#ff6536] text-white px-2 py-1 hover:opacity-50 ml-auto">Log In / Sign Up</button>
            </p>
          </div>
        )}
        {isOpen && session && (
          <div className="absolute w-48 rounded-sm border border-gray-200 shadow-md min-h-min top-12 right-0 z-40 bg-white text-gray-600 flex flex-col gap-2 items-center justify-center">
            <Link
              href="/my-profile"
              className="flex-1 px-4  w-full cursor-pointer hover:bg-gray-200 hover:text-black rounded-sm mt-2"
            >
              My Profile
            </Link>
            <Link
              href="/my-profile"
              className="flex-1 px-4  w-full cursor-pointer hover:bg-gray-200 hover:text-black rounded-sm"
            >
              My Addresses
            </Link>
            <Link
              href="/my-profile"
              className="flex-1 px-4  w-full cursor-pointer hover:bg-gray-200 hover:text-black rounded-sm"
            >
              My Wishlist
            </Link>
            <Link
              href="/my-profile"
              className="flex-1 px-4  w-full cursor-pointer hover:bg-gray-200 hover:text-black rounded-sm"
            >
              My Orders
            </Link>
            <Link
              href="/track-order"
              className="flex-1 px-4 w-full cursor-pointer hover:bg-gray-200 hover:text-black rounded-sm"
            >
              Track Orders
            </Link>
            <Link
            href="/"
              onClick={signOut}
              className="flex-1 px-4 py-2 w-full cursor-pointer hover:bg-gray-200 hover:text-black rounded-sm border"
            >
              Sign Out
            </Link>
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      className={` rounded-full p-2 bg-[${bgColor}] text-gray-900 hover:opacity-60 transition hover:scale-105`}
    >
      <Icon size={30} />
    </button>
  );
};

export default RoundButton;
