import Container from "../components/Container";

import React, { useEffect, useState } from "react";

import { getSession, signOut, useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { onOpen } from "../store/loginModalSlice";
import { fetchDataFromApi } from "../libs/api";
import Profile from "../components/DashboardModes/Profile";
import Orders from "../components/DashboardModes/Orders";
import Wishlist from "../components/DashboardModes/Wishlist";
import { useRouter } from "next/router";
import Head from "next/head";
import SavedAddresses from "../components/SavedAddresses";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { data: session } = useSession();


  const [dashMode, setDashMode] = useState("PROFILE");
  const [userData, setUserData] = useState(null);






  useEffect(() => {

    if(session?.id){

      
      fetchDataFromApi(
        `api/users/${session?.id}?populate=*`
        ).then((res) => {
          setUserData(res);
        });
      }
  }, [session?.id]);

  let bodyContent = null;
  if (!session) {
    return (
      <>
      <Head>
        <title>Profile Information - Haroth.com</title>
        <meta name="description" content="User Profile Information for Haroth.com" /> 
      </Head>
      <Container>
        <div className="min-h-screen flex flex-col items-center justify-center px-6 md:px-16 lg:px-32 pt-8 md:pt-16 lg:pt-32">
          You are not Signed In!
          <button
            onClick={() => dispatch(onOpen())}
            className="bg-[#ff6536] hover:opacity-60 px-4 py-2 text-xl text-white cursor-pointer"
          >
            Sign In
          </button>
        </div>
      </Container>
      </>
    );
  }

  if (dashMode === "PROFILE") {
    bodyContent = <Profile userData={userData} />
  }

  if(dashMode === "ADDRESS") {
    bodyContent = <SavedAddresses userData={userData} />
  }


  if(dashMode === "ORDERS") {
    bodyContent = <Orders userData={userData} />
  }

  if(dashMode === "WISHLIST") {
    bodyContent = <Wishlist userData={userData} />
  }

  if(dashMode === "LOGOUT") {
    signOut({ callbackUrl: '/' });    
  }


  return (
    <Container>
       <Head>
        <title>Profile Information - Haroth.com</title>
        <meta name="description" content="User Profile Information for Haroth.com" /> 
      </Head>
      <section className="w-screen max-w-screen min-h-screen px-6 md:px-16 lg:px-36 pt-24 lg:pt-[165px] flex flex-col gap-4">
      <h1 className="w-full block font-bold text-2xl md:text-3xl lg:text-5xl">My Profile</h1>
      <p className='font-bold text-xl'>{userData?.username} - {userData?.phone_number}</p>
        <div className="border-y border-gray-200 flex py-3 justify-between md:justify-normal md:gap-10">
        
          <p className="text-sm sm:text-base md:text-xl cursor-pointer" onClick={() =>  setDashMode("PROFILE")}>Profile</p>
          <p className="text-sm sm:text-base md:text-xl cursor-pointer" onClick={() =>  setDashMode("ADDRESS")}>Saved Addresses</p>
          <p className="text-sm sm:text-base md:text-xl cursor-pointer" onClick={() =>  setDashMode("WISHLIST")}>Wishlist</p>
          <p className="text-sm sm:text-base md:text-xl cursor-pointer" onClick={() =>  setDashMode("ORDERS")}>Orders</p>
          <p className="text-sm sm:text-base md:text-xl cursor-pointer" onClick={() =>  setDashMode("LOGOUT")}>Logout</p>

        </div>
        <div className=" w-full text-center rounded-md ">
          {bodyContent}
        </div>
      </section>
    </Container>
  );
};

export default Dashboard;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  // Check if session exists or not, if not, redirect
  if (session == null) {
    return {
      redirect: {
        destination: "/not-authenticated",
        permanent: true,
      },
    };
  }
  return {
    props: {},
  };
};
