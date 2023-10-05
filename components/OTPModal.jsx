import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onClose as closeOtpModal, updateOtp } from "../store/otpModalSlice";
import { onOpen as openRegisterModal } from "../store/registerModalSlice";
import { onOpen as openLoginModal } from "../store/loginModalSlice";
import { useForm } from "react-hook-form";
import { AiOutlineClose, AiOutlineLeft } from "react-icons/ai";
import OtpInput from "react-otp-input";
import { motion } from "framer-motion";
import Input from "./Input";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import Loading from "./Loading";
import Link from "next/link";

const OTPModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [otp, setOtp] = useState("");

  

  const {
    isOpen,
    phone_number,
    isRegister,
    otp: generatedOtp,
  } = useSelector((state) => state.otpModal);

  console.log("is Register", isRegister);
  const dispatch = useDispatch();
  const router = useRouter();

  // useEffect(() => {
  //   axios.post("/api/verifyOtp", {
  //     phone_number: phone_number
  //   }).then(res => {
  //     setGeneratedOtp(res.data.otp)
  //   });

  // }, [phone_number])



  const resendOtp = async () => {
    try {
      setIsLoading(true)
      let {
      data: {otp: generatedOtp}
    } = await axios.post("/api/verifyOtp", {
      phone_number: phone_number,
    });


    console.log("Genrated OTP", generatedOtp);
    dispatch(updateOtp({ otp: generatedOtp }));
    toast.success("OTP Resent");
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong");
    }
    finally{
      setIsLoading(false)
    }
    
  }

  const submitHandler = async (e) => {
    try {
      setIsLoading(true);
      setIsError(false);
      e.preventDefault();
      if (otp.length < 6) {
        toast.error("Invalid OTP:  OTP must contain 6 digits");
        return;
      }
      console.log("GENERATED OTP", generatedOtp);

      if(isRegister == true) {

        if(generatedOtp == otp) {

          dispatch(closeOtpModal())
          dispatch(openRegisterModal({
            phone_number: phone_number,
          }));
          
          setIsLoading(false);
          return;

        } else {
          setIsError("Invalid OTP");
          setIsLoading(false);
          return;
        }

      }

      const result = await signIn("credentials", {
        phone_number: phone_number,
        generatedOtp: generatedOtp,
        otp: otp,
        redirect: false,
      });

      
      console.log("RESULT --> ", result);
      
      if (result.ok) {
        toast.success("Logged in Successfully!");
        dispatch(closeOtpModal());
        if(router.pathname.includes("not-authenticated")) {
          router.push("/");
          router.reload();
        } else {
          router.reload();
        }
        return;
      }
      setIsError(true);
      toast.error("Invalid OTP");
    } catch (error) {
      console.log("ERROR", error);
      toast.error("Something Went Wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    isOpen && (
      <div
        onClick={() => dispatch(closeOtpModal())}
        className="fixed w-full h-full top-0 left-0 bg-black/50 flex items-center justify-center z-[1000]"
      >
        <motion.div
          initial={{
            y: 200,
          }}
          animate={{
            y: 0,
          }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-5/6 md:w-1/2 lg:w-[30%] max-h-max bg-white z-40 flex flex-col gap-6 items-center px-8 md:py-8 py-6 rounded-lg"
        >
          <span className="lg:text-2xl sm:text-xl text-lg text-black font-bold">
            OTP Verification
          </span>
          <p className="text-base text-center font-normal">
            We&apos;ve sent you an OTP to the Phone No. ending with ...
            <span className="font-bold">{phone_number.slice(-3)}</span>
          </p>
          {isError && (
            <span className="text-base lg:text-lg -mt-4 underline underline-offset-4 text-red-500">
              Invalid OTP
            </span>
          )}
          <form
            className="flex flex-col items-center justify-center w-full gap-8"
            onSubmit={submitHandler}
          >
            {/* <Input
              register={register}
              errors={errors.email}
              label="Enter OTP"
              type="number"
              id="otp"
              required={true}
              disabled={isLoading}
              minLength={6}
              maxLength={6}
            />

       */}

            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span className="-mx-2">-</span>}
              renderInput={(props) => <input {...props} />}
              inputStyle={`h-full py-2 flex-1 text-2xl lg:text-3xl rounded-md border-2 border-gray -400 text-center focus:border-black`}
              containerStyle={`w-full flex gap-4 justify-center px-6`}
              inputType="number"
              shouldAutoFocus={true}
            />

            <input
              className="w-1/2 bg-[#ff6536] text-white rounded-lg px-4 md:py-4 py-2 border-2 border-black hover:bg-white hover:text-[#ff6536] transition duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              value="Sign In"
              disabled={isLoading}
            />
          </form>
          <button onClick={resendOtp} className="text-lg text-[#ff6536] ml-2 cursor-pointer hover:underline">
 
              Resend OTP

          </button>
          <button
            onClick={() => {
              if (isRegister) {
                dispatch(closeOtpModal());
                dispatch(openRegisterModal());
              } else {
                dispatch(closeOtpModal());
                dispatch(openLoginModal());
              }
            }}
            className="text-gray-500 text-sm lg:text-base -mt-4 text-center hover:text-black hover:underline "
          >
            Entered Wrong Number?
          </button>
          <button
            onClick={() => dispatch(closeOtpModal())}
            className="absolute right-4 top-2 hover:bg-gray-300 text-gray-600 rounded-full p-4 text-xl hover:text-black transition duration-200"
          >
            <AiOutlineClose />
          </button>
          <button
            onClick={() => {
              
                dispatch(closeOtpModal());
               
                dispatch(openLoginModal());
              
            }}
            className="absolute left-4 top-2 hover:bg-gray-300 text-gray-600 rounded-full p-4 text-xl hover:text-black transition duration-200"
          >
            <AiOutlineLeft />
          </button>
        </motion.div>
        <Loading loading={isLoading} />
      </div>
    )
  );
};

export default OTPModal;
