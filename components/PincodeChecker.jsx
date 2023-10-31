import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { getEstimatedDelivery, getShiprocketToken } from "../libs/helper"; // Import getShiprocketToken
import { IoMdLocate } from "react-icons/io";

const PincodeChecker = ({ brandPincode }) => {
  const [availability, setAvailability] = useState("");

  // console.log("Brand Pincode", brandPincode);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const token = await getShiprocketToken(); // Get the Shiprocket token

      console.log("Shiprocket Token:", token);

      const { maxDays, minDays } = await getEstimatedDelivery(data.pincode, brandPincode, token);

      console.log("Max Days:", maxDays);
      console.log("Min Days:", minDays);

      if (maxDays && minDays) {
        let maxDate = new Date(
          new Date().getTime() + maxDays * 10 * 60 * 60 * 1000
        ).toDateString();
        let minDate = new Date(
          new Date().getTime() + minDays * 24 * 60 * 60 * 1000
        ).toDateString();

        setAvailability({ max: maxDate, min: minDate });
      } else {
        setError("pincode", { type: "custom", message: "Invalid Pincode" });
        setAvailability("Invalid Pin Code");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("pincode", { type: "custom", message: "Something Went Wrong" });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-h-min flex justify-center items-center gap-1"
      >
        <input
          className="flex-[1] border-2 border-gray-300 bg-white py-[1.5%] px-4"
          placeholder="Enter Pincode"
          type="number"
          id="pincode"
          {...register("pincode", {
            required: true,
          })}
        />
        <button
          className="flex-[1] flex items-center gap-1 px-2 self-stretch text-[#ff6536] hover:opacity-50 transition duration-200 text-base sm:text-lg font-medium cursor-pointer"
          type="submit"
        ><IoMdLocate size={20} />Locate</button>
      </form>

      <div className="block w-full ">
        <p className={`text-red-500 mt-2 mb-4`}>
          {availability.max && availability.min && (
            <span className="text-black font-bold font-sans text-sm">
              Delivery FREE by <span className=" text-[#309c37]">{availability.max} &nbsp; <br /></span>
              <p> Assembly ₹799 Provided by TAK Decor (optional)</p>
            </span>
          )}
          {errors?.pincode?.type === "required" && "Pincode is required"}
          {errors?.pincode?.type === "custom" && errors.pincode.message}
        </p>
      </div>
    </>
  );
};

export default PincodeChecker;
