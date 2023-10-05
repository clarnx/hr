import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onClose as closeBulkPurchaseForm } from "../store/bulkPurchaseSlice";
import { set, useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import { motion } from "framer-motion";
import Loading from "./Loading";
import { toast } from "react-hot-toast";
import axios from "axios";
import { IoMdLocate } from "react-icons/io"
import { FiNavigation } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { sendOtp, verifyOtp, getLocation } from "../libs/helper"



export const BulkFormInput = ({ register, label, id, required, type, minLength, spanFull, errors, maxLength }) => {
  return (
    <div className={`${spanFull && "col-span-full"} w-full`}>
      <input
        className={`border border-gray-300 rounded-md px-2 py-1 w-full ${spanFull && "col-span-full"}`}
        type={type}

        placeholder={label} {...register(id, {
          required,
          minLength
        })} />

      {errors && <p className="absolute -bottom-2/3 text-xs sm:text-sm left-0 text-red-500">
        {errors.type === "required" && `${label} is required`}
        {errors.type === "custom" && errors.message}
      </p>}

    </div>
  )
}

const BulkPurchaseForm = () => {
  const { isOpen } = useSelector((state) => state.bulkPurchase);
  const [isLoading, setisLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [hasChecked, setHasChecked] = useState(false)

  const [pincode, setPincode] = useState("")

  const dispatch = useDispatch();



  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
    reset,
    setError,
    formState,
    setValue,
    setFocus
  } = useForm();

  const sendOtp = async () => {
    let mobileno = getValues("mobileno");
    try {
      setError("mobileno", null)

      if (mobileno.length === 0) {
        setError("mobileno", {
          type: "required",
          message: "Mobile No. is required"
        })
        return;
      } else if (mobileno.length < 10 || mobileno.length > 10) {
        setError("mobileno", {
          type: "custom",
          message: "Mobile No. must be of 10 digits"
        })

        return;
      }


      setOtpSent(false);
      setisLoading(true);

      let {
        data: { otp }
      } = await axios.post("/api/verifyOtp", {
        phone_number: mobileno,
      });

      setGeneratedOtp(otp)

      setOtpSent(true);

    } catch (error) {
      toast.error("ERROR SENDING OTP");
      console.log(error)
    }
    finally {
      setisLoading(false)
    }



  }

  const verifyOtp = async () => {
    setisLoading(true);

    if (!otpSent) {
      setFocus("mobileno");
      setError("enteredOtp", {
        type: "custom",
        message: "Enter Correct Mobile Number"
      });
      setisLoading(false)
      return;
    }

    let enteredOtp = getValues('enteredOtp')

    try {

      setError("enteredOtp", null)
      if (enteredOtp.length === 0) {
        setError("enteredOtp", {
          type: "required",
          message: "OTP is required"
        })
        setisLoading(false)
        return;
      } else if (enteredOtp.length < 6 || enteredOtp.length > 6) {
        setError("enteredOtp", {
          type: "custom",
          message: "OTP must be of 6 digits"
        })

        setisLoading(false)
        return;
      }

      if (enteredOtp == generatedOtp) {
        setIsVerified(true)
        toast.success("Mobile Number Verified");

      } else {
        setError("enteredOtp", {
          type: "custom",
          message: "INVALID OTP"
        })

      }

    } catch (error) {
      console.log(error);
      toast.error("ERROR verifying OTP");
    }
    finally {
      setisLoading(false)
    }
  }


  const onSubmit = async (data) => {
    try {
      setisLoading(true);
      setErrorMsg("");
      console.log("DATA", data)

      const res = await axios.post("/api/contact", { data, type: "bulk" });

      if (res.status == 200) {
        toast.success("Message Sent Successfully!")
        dispatch(closeBulkPurchaseForm())
      }

    } catch (error) {
      console.log(error);
      if (error?.response?.status === 400) {
        setErrorMsg(error.response.data.message);
      } else {
        toast.error("Error Submitting Form");
      }
    } finally {

      setisLoading(false);
    }

  };



  return (
    isOpen && (
      <div
        onClick={() => dispatch(closeBulkPurchaseForm())}
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
          className="relative w-5/6 md:w-2/3 lg:w-1/2 min-h-max bg-white z-40 flex flex-col gap-4 md:gap-6 items-center md:px-14 px-6 md:py-8 py-2 sm:py-4 rounded-lg"
        >
          <Image
            src="https://nextjspics.s3.ap-south-1.amazonaws.com/furniture_homepage_2_14f592a32d.webp"
            height={50}
            width={200}
            alt="Bulk Order"
            className="w-full max-sm:hidden h-[50px] sm:h-[75px]"
          />
          <span className="text-lg md:text-xl lg:text-3xl text-black text-center">Looking for Bulk Purchase?
            <span className="text-gray-400 text-xs sm:text-xs block w-full">Fill in the details and we will get back to you shortly.</span>
          </span>
          {errorMsg && (
            <span className="text-base md:text-xl -mt-4 underline underline-offset-4 text-red-500">
              {errorMsg}
            </span>
          )}
          <form
            className="grid grid-cols-1 sm:grid-cols-2 w-full gap-6 md:gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <BulkFormInput
              type="text"
              label="Name"
              required={true}
              id="name"
              register={register}
              errors={errors.name}
            />
            <BulkFormInput
              type="email"
              label="Email"
              required={false}
              id="email"
              register={register}
              errors={errors.email}
            />

            {/* MOBILE NUMBER INPUT START */}
            <div className="relative w-full h-fit">
              <input
                className={`border border-gray-300 rounded-md px-2 py-1 w-full `}
                type="number"
                placeholder="Mobile Number"
                {...register("mobileno", { required: true })}
              />
              {errors.mobileno && <p className="absolute -bottom-2/3 text-xs sm:text-sm left-0 text-red-500">
                {errors.mobileno.type === "required" && "Mobile No. is required"}
                {errors.mobileno.type === "custom" && errors.mobileno.message}
              </p>}

              {
                otpSent && !isVerified && <p className="absolute -bottom-2/3 text-xs sm:text-sm left-0 text-green-500">
                  OTP Sent!
                </p>
              }

              <span onClick={async () => { await sendOtp() }} className="absolute right-2 bottom-[16%] text-[#ff6536] flex items-center cursor-pointer">

                Send OTP
              </span>
            </div>
            {/* MOBILE NUMBER INPUT END */}


            {/* OTP INPUT START */}

            <div className="relative w-full h-fit">
              <input
                className={`border border-gray-300 rounded-md px-2 py-1 w-full disabled:opaicty-40 disabled:cursor-not-allowed`}
                type="number"
                placeholder="OTP"
                disabled={!otpSent || isVerified}
                {...register("enteredOtp", { required: true })}
              />
              {errors.enteredOtp && <p className="absolute -bottom-2/3 text-xs sm:text-sm left-0 text-red-500">
                {errors.enteredOtp.type === "required" && "OTP is required"}
                {errors.enteredOtp.type === "custom" && errors.enteredOtp.message}
              </p>}

              {
                otpSent && isVerified && (
                  <span className="absolute right-2 bottom-[16%] text-green-500 flex items-center cursor-pointer">
                    Verified ✅
                  </span>
                )
              }
              {
                !isVerified && <span onClick={async () => { await verifyOtp() }} className="absolute right-2 bottom-[16%] text-[#ff6536] flex items-center cursor-pointer">

                  Verify OTP
                </span>
              }

            </div>
            {/* OTP INPUT END */}




            <div className="relative w-full h-fit">
              <input
                className={`border border-gray-300 rounded-md px-2 py-1 w-full `}
                type="number"
                {...register("pincode", {
                  required: true
                })}
                placeholder="Pincode"
                onChange={(e) => setPincode(e.target.value)}
              />
              {errors.pincode && <p className="absolute -bottom-2/3 text-xs sm:text-sm left-0 text-red-500">
                {errors.pincode.type === "required" && "Pincode is required"}
                {errors.pincode.type === "custom" && errors.pincode.message}
              </p>}

              <span onClick={async () => { await getLocation(pincode, setError, setValue, setisLoading) }} className="absolute right-2 bottom-[16%] text-[#ff6536] flex items-center cursor-pointer">

                Locate
                <IoMdLocate size={25} />
              </span>
            </div>


            <BulkFormInput
              type="text"
              label="Locality"
              required={false}
              id="locality"
              register={register}
              errors={errors.locality}
            />

            <BulkFormInput
              type="text"
              label="State"
              required={false}
              id="state"
              register={register}
              errors={errors.state}
            />

            <BulkFormInput
              type="text"
              label="City"
              required={false}
              id="city"
              register={register}
              errors={errors.city}
            />

            <BulkFormInput
              type="text"
              label="Company Name"
              required={false}
              id="companyName"
              register={register}
              errors={errors.companyName}
            />
            <BulkFormInput
              type="number"
              label="Business Phone No."
              required={false}
              id="businessPhoneNo"
              register={register}
              errors={errors.businessPhoneNo}
            />
            <BulkFormInput
              type="text"
              label="Address"
              required={false}
              id="address"
              register={register}
              spanFull={true}
              errors={errors.address}
            />

            
            <div className="col-span-full flex flex-col gap-2 items-center">

            <div className="col-span-full mx-auto flex flex-row items-center text-xs md:text-sm">
              <input
                type="checkbox"
                id="privacyPolicy"
                onChange={(e) => {
                  if (e.target.checked) {
                    setHasChecked(true);
                  } else {
                    setHasChecked(false)
                  }
                }}
              />
              <label htmlFor="privacyPolicy">&nbsp; I&apos;ve read all the <Link className="text-[#ff6536]" href="/policies">{`Policies`}</Link> and <Link className="text-[#ff6536]" href="/policies">{`Terms & Condition`}</Link></label>
            </div>


            <input
              className="w-1/2 sm:col-span-2 mx-auto bg-[#ff6536] text-white rounded-lg px-4 py-1 md:py-2 border border-black hover:bg-white hover:text-[#ff6536] transition duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              value="Submit"
              disabled={isLoading || !hasChecked}
            />
            </div>
          </form>
          <button
            onClick={() => dispatch(closeBulkPurchaseForm())}
            className="absolute right-2 top-1 hover:bg-gray-300 text-gray-600 max-sm:text-white rounded-full p-3 max-sm:p-1 text-xl max-sm:bg-black/20 hover:text-black transition duration-200"
          >
            <AiOutlineClose />
          </button>
        </motion.div>
        <Loading loading={isLoading} />
      </div>
    )
  );
};

export default BulkPurchaseForm;
