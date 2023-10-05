import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineMenu, AiOutlineUser, AiOutlineHome, AiFillShop, AiOutlineHeart } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { GrLocation } from "react-icons/gr"
import { HiOutlineInformationCircle } from "react-icons/hi2"
import { MdOutlinePolicy } from "react-icons/md"
import { onOpen as openContactForm } from "../store/contactFormSlice";
import { TfiWrite } from "react-icons/tfi"
import { BiLogOut, BiSupport } from 'react-icons/bi'
import { useDispatch } from "react-redux";
import { onOpen as openLoginModal } from "../store/loginModalSlice";
import { Router, useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { BsBox2, BsBoxSeam, BsChevronDown, BsChevronLeft, BsFillBoxSeamFill } from "react-icons/bs";
import Link from "next/link";
import logo from "../public/logo.webp";
import { fetchDataFromApi } from "../libs/api";
import Image from "next/image";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { data: session } = useSession();

  const [isOpen, setisOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState(false);
  const [search, setSearch] = useState("");
  const [userInformation, setUserInformation] = useState(null)



  const toggleSidebar = () => setisOpen((prev) => !prev);
  const router = useRouter();

  let sidebarItems = [
    {
      name: <><AiOutlineHome className="self-center" /> Home</>,
      href: "/",
    },
    {
      name: <><BsSearch className="self-center" />Search Products</>,
      href: "/search",
    },
    {
      name: <><BsBoxSeam className="self-center" />Bulk Order</>,
      onClick: () => dispatch(openContactForm()),
    },
    {
      name: <><GrLocation className="self-center" /> Track Order</>,
      href: "/track-order",
    },
    {
      name: <><AiFillShop className="self-center" />{`Stores (opening soon)`}</>,
      href: "/",
    },
    {
      name: <><TfiWrite className="self-center" /> Blogs</>,
      href: "https://blog.haroth.com",
    },
    {
      name: <><HiOutlineInformationCircle className="self-center" /> About Us</>,
      href: "/",
    },
    {
      name: <><MdOutlinePolicy className="self-center" /> Policies</>,
      href: "/policies",
    },
    {
      name: <><BiSupport className="self-center" /> Support</>,
      href: "/",
    },
  ];

  if (session?.id) {
    sidebarItems = [
      {
        name: <><AiOutlineHome className="self-center" /> Home</>,
        href: "/",
      },
      {
        name: <><BsSearch className="self-center" />Search Products</>,
        href: "/search",
      },
      {
        name: <><AiOutlineUser className="self-center" /> My Profile</>,
        href: "/my-profile"
      },
      {
        name: <><BsFillBoxSeamFill className="self-center" /> Orders</>,
        href: "/my-profile"
      },
      {
        name: <><AiOutlineHeart className="self-center" /> Wishlist</>,
        href: "/my-profile"
      },
      {
        name: <><BsBoxSeam className="self-center" />Bulk Order</>,
        onClick: () => dispatch(openContactForm()),
      },
      {
        name: <><GrLocation className="self-center" /> Track Order</>,
        href: "/track-order",
      },
      {
        name: <><AiFillShop className="self-center" />{`Stores (opening soon)`}</>,
        href: "/",
      },
      {
        name: <><TfiWrite className="self-center" /> Blogs</>,
        href: "https://blog.haroth.com",
      },
      {
        name: <><HiOutlineInformationCircle className="self-center" /> About Us</>,
        href: "/",
      },
      {
        name: <><MdOutlinePolicy className="self-center" /> Policies</>,
        href: "/policies",
      },
      {
        name: <><BiSupport className="self-center" /> Support</>,
        href: "/",
      },
      {
        name: <><BiLogOut className="self-center" />Logout</>,
        onClick: () => signOut()
      }
    ];
  }


  useEffect(() => {


    if (session?.id) {
      const res = fetchDataFromApi(`api/users/${session?.id}`).then(response => setUserInformation(response));
    }
  }, [session?.id])


  const handleSearch = (e) => {
    e.preventDefault();

    router.push({ pathname: "/search", query: { search } });
  };



  return (
    <>
      <AiOutlineMenu onClick={() => setisOpen(true)} />
      <div
        className={`fixed top-0 left-0 w-screen min-h-screen bg-black/50 z-[1000000] ${isOpen ? "translate-x-0" : "-translate-x-[100%] "
          } transition-all duration-300`}
        onClick={() => setisOpen(false)}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white text-gray-700 w-screen min-h-screen py-2 flex flex-col gap-2 items-center"
        >
          <div
            onClickCapture={() => setisOpen(false)}
            className="w-full flex justify-between items-center gap-2 px-6  py-2"
          >
            <button className="flex gap-1 items-center">
              <BsChevronLeft />
            </button>
            <Link href="/">
              <Image
                src={logo}
                width={200}
                height={200}
                className="w-[130px] h-auto"
                alt="logo"
              />
            </Link>
            <button onClick={() => { dispatch(openLoginModal()) }} className="bg-[#ff6536] text-white py-1 px-2 rounded-lg">
              {userInformation ? `Hello, ${userInformation?.username}` : "Login / Register"}
            </button>
          </div>

          <div className="border-[1px] border-gray-300 w-full px-6 py-1 sm:py-2 flex gap-x-2 items-center">
            {" "}
            <BsChevronLeft onClick={() => setOpenCategories(false)} />{" "}
            <span onClick={() => setOpenCategories(true)}>
              Explore All Categories
            </span>
          </div>

          {openCategories ? (
            <nav className="w-full min-h-full overflow-y-auto">

              <Link onClick={() => setisOpen(false)} href={`/category/furniture`} key={"1"} className="px-6 py-4 flex gap-x-2 text-black list-none border-b-[1px] border-b-gray-300 capitalize">Furniture</Link>
              <Link onClick={() => setisOpen(false)} href={`/category/chairs-and-seating`} key={"2"} className="px-6 py-4 flex gap-x-2 text-black list-none border-b-[1px] border-b-gray-300 capitalize">Chairs &#38; Seating</Link>
              <Link onClick={() => setisOpen(false)} href={`/category/storage`} key={"3"} className="px-6 py-4 flex gap-x-2 text-black list-none border-b-[1px] border-b-gray-300 capitalize">Storage</Link>
              <Link onClick={() => setisOpen(false)} href={`/category/home-decor`} key={"4"} className="px-6 py-4 flex gap-x-2 text-black list-none border-b-[1px] border-b-gray-300 capitalize">Home Decor</Link>
              <Link onClick={() => setisOpen(false)} href={`/category/study-and-office`} key={"5"} className="px-6 py-4 flex gap-x-2 text-black list-none border-b-[1px] border-b-gray-300 capitalize">Study &#38; Office</Link>
              <Link onClick={() => setisOpen(false)} href={`/category/kitchen-appliances`} key={"6"} className="px-6 py-4 flex gap-x-2 text-black list-none border-b-[1px] border-b-gray-300 capitalize">Applicances</Link>
              <Link onClick={() => setisOpen(false)} href={`/category/handicrafts`} key={"7"} className="px-6 py-4 flex gap-x-2 text-black list-none border-b-[1px] border-b-gray-300 capitalize">Handicrafts</Link>
              <Link onClick={() => setisOpen(false)} href={`/category/wooden-store`} key={"8"} className="px-6 py-4 flex gap-x-2 text-black list-none border-b-[1px] border-b-gray-300 capitalize">Wooden Store</Link>
              <Link onClick={() => setisOpen(false)} href={`/category/lights`} key={"9"} className="px-6 py-4 flex gap-x-2 text-black list-none border-b-[1px] border-b-gray-300 capitalize">Lamp &#38; Lights</Link>
              <Link onClick={() => setisOpen(false)} href={`/modular-interior?isModular=false`} key={"10"} className="px-6 py-4 flex gap-x-2 text-black list-none border-b-[1px] border-b-gray-300 capitalize">Interior</Link>
              <Link onClick={() => setisOpen(false)} href={`/modular-interior?isModular=true`} key={"11"} className="px-6 py-4 flex gap-x-2 text-black list-none border-b-[1px] border-b-gray-300 capitalize">Modular</Link>

            </nav>
          ) : (
            <nav className="w-full overflow-y-auto">
              {sidebarItems.map((item, i) =>
                item.onClick ? (
                  <p
                    onClick={() => {

                      if (item.onClick) {
                        item.onClick();
                      }

                      setisOpen(false);
                    }}
                    key={i}
                    className="px-6 py-3 sm:py-4 flex items-baseline gap-x-2 text-black list-none border-b-[1px] border-b-gray-300"
                  >
                    {item.name}
                  </p>
                ) : (
                  <Link

                    onClick={() => {
                      setisOpen(false);
                    }}
                    href={item?.href}
                    key={i}
                    className="px-6 py-3 sm:py-4 flex items-baseline gap-x-2 text-black list-none border-b-[1px] border-b-gray-300"
                  >
                    {item.name}
                  </Link>
                )
              )}
            </nav>
          )}

          {/* ITEMS */}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
