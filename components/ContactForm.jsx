import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onClose as closeContactForm } from "../store/contactFormSlice";
import { useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import Input from "./Input";
import { motion } from "framer-motion";
import Loading from "./Loading";
import { toast } from "react-hot-toast";
import axios from "axios";
import {BulkFormInput} from "../components/BulkPurchaseForm"

const ContactForm = () => {
  const { isOpen, email, phone_number } = useSelector((state) => state.contactForm);
  const [isLoading, setisLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setisLoading(true);
      setErrorMsg("");
      // console.log("DATA", data)

      const res = await axios.post("/api/contact", { data, type: "callback" });

      if(res.status == 200) {
        toast.success("Message Sent Successfully!")
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
        onClick={() => dispatch(closeContactForm())}
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
          className="relative w-5/6 md:w-2/3 lg:w-1/2 max-h-max bg-white z-40 flex flex-col gap-4 sm:gap-8 items-center md:px-16 px-8 md:py-8 py-6 rounded-lg"
        >
          <span className="text-lg md:text-xl lg:text-3xl font-sans text-black text-center">Request a Callback
            <span className="text-gray-400 text-sm block w-full">Fill in the details and we will get back to you shortly.</span>
          </span>
          {errorMsg && (
            <span className="text-xl -mt-4 underline underline-offset-4 text-red-500">
              {errorMsg}
            </span>
          )}
          <form
            className="grid grid-cols-1 sm:grid-cols-2 w-full gap-3 md:gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <BulkFormInput
              register={register}
              errors={errors.name}
              label="Name*"
              type={"text"}
              id="name"
              required={true}
              disabled={isLoading}
            />
            <BulkFormInput
              register={register}
              errors={errors.email}
              label="Email (optional)"
              type="email"
              id="email"
              disabled={isLoading}

            />
            <BulkFormInput
              register={register}
              errors={errors.phone}
              label="Phone No.*"
              type={"number"}
              id="phone"
              required={true}
              disabled={isLoading}
              minLength={10}
              maxLength={13}
            />
            <BulkFormInput
              register={register}
              errors={errors.city}
              label="City*"
              type={"text"}
              id="city"
              required={true}
              disabled={isLoading}

            />

            <textarea placeholder="Share Your Concern" rows={4} {...register("msg")} id="msg" className="col-span-full min-h-[70px] sm:min-h-[100px] border-[1px] border-gray-300 p-2 w-full placeholder:text-gray-300 rounded-lg">

            </textarea>


            <input
              className="w-1/2 bg-blue-600 text-white rounded-lg px-4 py-2 md:py-3 border-2 hover:bg-blue-900 hover:text-white transition duration-200 cursor-pointer sm:col-span-2 place-self-center disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              value="Submit"
              disabled={isLoading}
            />
          </form>
          <button
            onClick={() => dispatch(closeContactForm())}
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

export default ContactForm;
