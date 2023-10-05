import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onClose as closeRegisterModal } from "../store/registerModalSlice";
import { onOpen as openLoginModal } from "../store/loginModalSlice";
import { onOpen as openOtpModal } from "../store/otpModalSlice"
import { useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import Input from "./Input";
import { motion } from "framer-motion";
import Loading from "./Loading";
import { toast } from "react-hot-toast";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { BulkFormInput } from "./BulkPurchaseForm";

const RegisterModal = () => {
  const { isOpen, phone_number } = useSelector((state) => state.registerModal);
  const [isLoading, setisLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    reset({
      email: "",
      phone: phone_number,
      username: ""
    })
  }, [phone_number, reset]);
  const onSubmit = async (data) => {
    try {
      setisLoading(true);
      setErrorMsg("");
      
      let res = await axios.post("/api/register", data);

      if (res.status == 200) {
        toast.success("Account Created Successfully");

        const result = await signIn("credentials", {
          phone_number: data.phone,
          generatedOtp: 1234,
          otp: 1234,
          redirect: false,
        });


        // console.log("RESULT --> ", result);

        if (result.ok) {
          toast.success("Logged in Successfully!");
        } else {
          toast.error("Error Logging in. Please try again");
        }
        dispatch(closeRegisterModal());
        router.reload();
        return;
      }


    } catch (error) {
      // console.log("ERROR REGISTERING USER", error);
      toast.error("Error Registering User")
    } finally {
      setisLoading(false);
    }
  };

  return (
    isOpen && (
      <div
        onClick={() => dispatch(closeRegisterModal())}
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
          className="relative w-5/6 md:w-2/3 lg:w-[42%] max-h-max bg-white z-40 flex flex-col gap-8 items-center md:px-16 px-8 md:py-8 py-6 rounded-lg"
        >
          <span className="text-3xl text-black">Fill the Details</span>
          {errorMsg && (
            <span className="text-xl -mt-4 underline underline-offset-4 text-red-500">
              {errorMsg}
            </span>
          )}
          <form
            className="grid grid-cols-1 sm:grid-cols-2 w-full gap-8 gap-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >

            <div className="flex flex-col w-full">
            <p className="text-gray-600">Name {errors.username && <span className="text-red-500">is Required</span>}</p>
            <BulkFormInput
              register={register}
              errors={errors.username}
              label="Name"
              type={"text"}
              id="username"
              required={true}
              disabled={isLoading}
            />
            </div>

            <div className="flex flex-col w-full">
            <p className="text-gray-600">Phone No. {errors.phone && <span className="text-red-500">is Required</span>}</p>
            <BulkFormInput
              register={register}
              errors={errors.phone}
              label="Phone No."
              type={"number"}
              id="phone"
              required={true}
              disabled={isLoading}
              minLength={10}
              maxLength={13}
            />
            </div>

            <div className="flex flex-col w-full col-span-full">
            <p className="text-gray-600">Email Address {errors.email && <span className="text-red-500">is Required</span>}</p>
            <BulkFormInput
              register={register}
              errors={errors.email}
              label="Email"
              type="email"
              id="email"
              required={true}
              disabled={isLoading}
              spanFull
            />
            </div>
            <p className="text-xs sm:text-sm text-center opacity-60 sm:col-span-2">
              By Continuing, You agree to our{" "}
              <span className="text-[#ff6536] hover:opacity-100 cursor-pointer">
                Terms &#38; Conditions
              </span>{" "}
            </p>
            <input
              className="w-1/2 bg-[#ff6536] text-white rounded-lg px-4 py-4 border-2 border-black hover:bg-white hover:text-[#ff6536] transition duration-200 cursor-pointer sm:col-span-2 place-self-center disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              value="Sign In"
              disabled={isLoading}
            />
            <p className="sm:col-span-2 place-self-center">
              Already have an account?{" "}
              <span
                className="text-[#ff6536] cursor-pointer hover:underline"
                onClick={() => {
                  if (!isLoading) {
                    dispatch(closeRegisterModal());
                    dispatch(openLoginModal());
                  }
                }}
              >
                Log In
              </span>
            </p>
          </form>
          <button
            onClick={() => dispatch(closeRegisterModal())}
            className="absolute right-4 top-2 hover:bg-gray-300 text-gray-600 rounded-full p-4 text-xl hover:text-black transition duration-200"
          >
            <AiOutlineClose />
          </button>
        </motion.div>
        <Loading loading={isLoading} />
      </div>
    )
  );
};

export default RegisterModal;
