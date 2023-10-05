import React, { useState } from 'react'
import Container from '../components/Container'
import { onOpen as openLoginModal, onClose as closeLoginModal } from '../store/loginModalSlice'
import { onOpen as openRegisterModal } from '../store/registerModalSlice'
import { onOpen as openOtpModal } from '../store/otpModalSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { BulkFormInput } from '../components/BulkPurchaseForm'
import Image from 'next/image'
import { TbTruckDelivery } from 'react-icons/tb'
import { RiCustomerService2Line } from 'react-icons/ri'
import { AiFillShop, AiOutlineClose } from 'react-icons/ai'
import { getUser } from '../libs/api'
import axios from 'axios'

const NotAuthenticated = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const { isOpen } = useSelector((state) => state.loginModal);
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

      console.log("data", data);


      let existingUser = await getUser(phone_number, phone_number);
      if (existingUser?.length <= 0) {
        console.log("User Exists", existingUser);

        
        let {
          data: { otp }
        } = await axios.post("/api/verifyOtp", {
          phone_number: phone_number,
        });
        
        dispatch(closeLoginModal());

        dispatch(
          openOtpModal({
            phone_number: phone_number,
            isRegister: true,
            otp: otp,
          })
        );
        setIsLoading(false);
        return;
      } else {
        let {
          data: { otp }
        } = await axios.post("/api/verifyOtp", {
          phone_number: existingUser.phone_number,
        });


        console.log("Genrated OTP", otp);
        dispatch(closeLoginModal());
        dispatch(
          openOtpModal({
            phone_number: existingUser.phone_number,
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
      console.log(error);
      // toast.error(error)
    } finally {
      setIsLoading(false);
    }
  };

    const dispatch = useDispatch();


  return (
    <Container>
        <section className='w-full min-h-screen flex flex-col items-center justify-center pt-16'>
        <div
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
            src="https://img.haroth.com/decor_homepage_5_612e2f612a.webp"
            height={50}
            width={200}
            alt="Bulk Order"
            className="w-full h-[75px]"
          />
          <span className="text-xl text-black">Log In / Sign Up</span>
          {isError && (
            <span className="text-xl -mt-4 underline underline-offset-4 text-red-500">
              {isError}
            </span>
          )}
          <form
            className="flex flex-col items-center justify-center w-full gap-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <BulkFormInput
              register={register}
              errors={errors.emailPhone}
              label="Phone No"
              type="number"
              id="phone_number"
              required={true}
              disabled={isLoading}
              minLength={10}
              maxLength={10}
            />


            <p className="text-xs text-center opacity-60">
              By Continuing, You agree to our{" "}
              <span className="text-[#ff6536]">Terms &#38; Conditions</span>{" "}
            </p>
            <input
              className="w-1/2 bg-[#ff6536] text-white rounded-lg px-4 py-2 mt-2 border-2 border-black hover:bg-white hover:text-[#ff6536] transition duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              value="Sign In"
              disabled={isLoading}
            />
            <p className="sm:col-span-2 place-self-center">
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
            </p>
          </form>
          <div className="flex w-full justify-between items-center mt-4">
              <p className="flex flex-col items-center gap-1 text-gray-300"><TbTruckDelivery size={25} /> <span className="text-xs md:text-sm">Fast Delivery</span></p>
              <p className="flex flex-col items-center gap-1 text-gray-300"><RiCustomerService2Line size={25} /> <span className="text-xs md:text-sm">24 / 7 Support</span></p>
              <p className="flex flex-col items-center gap-1 text-gray-300"><AiFillShop size={25} /> <span className="text-xs md:text-sm">10+ Cities</span></p>
          </div>
        </div>
        </section>
    </Container>
  )
}

export default NotAuthenticated