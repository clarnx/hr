import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onClose as closeLoginModal } from "../store/loginModalSlice";
import { onOpen as openRegisterModal } from "../store/registerModalSlice";
import { onOpen as openOtpModal } from "../store/otpModalSlice";
import {TbTruckDelivery} from "react-icons/tb"
import { RiCustomerService2Line } from "react-icons/ri"
import { useForm } from "react-hook-form";
import { AiOutlineClose, AiFillShop } from "react-icons/ai";
import { motion } from "framer-motion";
import Input from "./Input";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import Loading from "./Loading";
import Link from "next/link";
import { fetchDataFromApi, getUser } from "../libs/api";
import { isEmailValid } from "../libs/helper";
import Image from "next/image";
import { BulkFormInput } from "./BulkPurchaseForm";


const LoginModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const { isOpen } = useSelector((state) => state.loginModal);
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setIsError(false);

      let { phone_number } = data;

      // console.log("data", data);

      let existingUser = await getUser(phone_number, phone_number);

      if (!existingUser || existingUser?.length <= 0) {
        // console.log("User Does Not Exist or Data Not Found", existingUser);
  
        let response = await axios.post("/api/verifyOtp", {
          phone_number: phone_number,
        });
  
        if (response.data?.otp) {
          dispatch(closeLoginModal());
  
          dispatch(
            openOtpModal({
              phone_number: phone_number,
              isRegister: true,
              otp: response.data.otp,
            })
          );
          setIsLoading(false);
          return;
        } else {
          setIsError("OTP not received for new registration.");
          setIsLoading(false);
        }
      
      // if (existingUser && Object.keys(existingUser).length <= 0) {
      //   // console.log("User Exists", existingUser);

        
      //   let {
      //     data: { otp }
      //   } = await axios.post("/api/verifyOtp", {
      //     phone_number: phone_number,
      //   });
        
      //   dispatch(closeLoginModal());

      //   dispatch(
      //     openOtpModal({
      //       phone_number: phone_number,
      //       isRegister: true,
      //       otp: otp,
      //     })
      //   );
      //   setIsLoading(false);
      //   return;
      } else {
        // dispatch(closeLoginModal());
        // dispatch(openRegisterModal());
        // return;
         // Make a POST request to "/api/verifyOtp" to verify OTP
      let response = await axios.post("/api/verifyOtp", {
        phone_number: data?.phone_number,
      });

      let { otp } = response.data;
        
        // console.log("Genrated OTP", otp);
        dispatch(closeLoginModal());
        dispatch(
          openOtpModal({
            phone_number: data.phone_number,
            isRegister: false,
            otp: otp,
          })
        );
        return;
      }
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        setIsError("Please Check Your Connection");
      }
      setIsError("Something went wrong")
      // console.log(error);
      // toast.error(error)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    isOpen && (
      <div
        onClick={() => dispatch(closeLoginModal())}
        className="fixed w-full h-full top-0 left-0 bg-black/50 flex items-center justify-center z-[100000]"
      >
        <motion.div
          initial={{
            y: 200,
          }}
          animate={{
            y: 0,
          }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-5/6 md:w-2/3 lg:w-[30%] max-h-max bg-white z-40 flex flex-col gap-4 items-center md:px-8 px-8 py-6 md:py-8 rounded-lg"
        >
          <Image
            src="https://nextjspics.s3.ap-south-1.amazonaws.com/office_homepage_1_copy_f2c46d5bb9.webp"
            height={50}
            width={200}
            alt="Bulk Order"
            className="w-full h-[75px]"
          />
          <span className="text-xl text-[#803428] font-extrabold">Sign Up or Log In</span>
          {isError && (
            <span className="text-xl -mt-4 underline underline-offset-4 text-red-500">
              {isError}
            </span>
          )}
          <form
            className="flex flex-col items-center justify-center w-full gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <BulkFormInput
              register={register}
              errors={errors.emailPhone}
              label="Enter Your Phone Number"
              type="number"
              id="phone_number"
              required={true}
              disabled={isLoading}
              minLength={10}
              maxLength={10}
            />


            <p className="text-xs text-center opacity-60">
              By Continuing, You agree to our{" "}
              <span className="text-[#ff5136]">Terms &#38; Conditions</span>{" "}
            </p>
            <input
              className="w-1/2 bg-[#ff6536] text-white rounded-lg px-4 py-2 mt-2 border-2 hover:bg-white hover:text-[#ff6536] transition duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed font-extrabold"
              type="submit"
              value="CONTINUE"
              disabled={isLoading}
            />
            {/* <p className="sm:col-span-2 place-self-center">
              New to Haroth?{" "}
              <span
                className="text-[#ff6536] cursor-pointer hover:underline"
                onClick={() => {
                  if (!isLoading) {
                    dispatch(closeLoginModal());
                    dispatch(openRegisterModal());
                  }
                }}
              >
                Create an Account
              </span>
            </p> */}
          </form>
          <div className="flex w-full justify-between items-center mt-8">
              <p className="flex flex-col items-center gap-1 text-gray-300"><TbTruckDelivery size={25} /> <span className="text-xs md:text-sm">Fast Delivery</span></p>
              <p className="flex flex-col items-center gap-1 text-gray-300"><RiCustomerService2Line size={25} /> <span className="text-xs md:text-sm">24 / 7 Support</span></p>
              <p className="flex flex-col items-center gap-1 text-gray-300"><AiFillShop size={25} /> <span className="text-xs md:text-sm">10+ Cities</span></p>
          </div>
          <button
            onClick={() => dispatch(closeLoginModal())}
            className="absolute right-2 top-1 hover:bg-gray-300 text-gray-600 rounded-full p-3 text-xl hover:text-black transition duration-200"
          >
            <AiOutlineClose />
          </button>
        </motion.div>
        <Loading loading={isLoading} />
      </div>
    )
  );
};

export default LoginModal;

// let userExists = await fetchDataFromApi(
//   `api/users?filters[$or][0][email][$eq]=${emailPhone}&filters[$or][1][phone_number][$eq]=${emailPhone}`
// );
