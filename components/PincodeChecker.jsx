import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getEstimatedDelivery, getShiprocketToken } from '../libs/helper'; // Import getShiprocketToken
import { IoMdLocate } from 'react-icons/io';

const PincodeChecker = ({ brandPincode }) => {
  const [availability, setAvailability] = useState('');
  const [pincodeInput, setPincodeInput] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();

  const onSubmit = async (data) => {
    if (pincodeInput.length !== 6) {
      setError('pincode', { type: 'custom', message: 'Pincode must be 6 digits' });
    } else {
      clearErrors('pincode');
      fetchEstimatedDelivery();
    }
  };

  // Fetch the result when the user enters their 6-digit pincode
  const fetchEstimatedDelivery = async () => {
    try {
      setIsFetching(true);

      const token = await getShiprocketToken(); // Get the Shiprocket token

      const { maxDays, minDays } = await getEstimatedDelivery(pincodeInput, brandPincode, token);

      if (maxDays && minDays) {
        let maxDate = new Date(new Date().getTime() + maxDays * 10 * 60 * 60 * 1000).toDateString();
        let minDate = new Date(new Date().getTime() + minDays * 24 * 60 * 60 * 1000).toDateString();

        setAvailability({ max: maxDate, min: minDate });
      } else {
        setError('pincode', { type: 'custom', message: 'Invalid Pincode' });
        setAvailability('Invalid Pin Code');
      }
    } catch (error) {
      setError('pincode', { type: 'custom', message: 'Something Went Wrong' });
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (pincodeInput.length === 6) {
      fetchEstimatedDelivery();
    } else {
      clearErrors('pincode');
      setAvailability('');
    }
  }, [pincodeInput, brandPincode]);

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
          {...register('pincode', {
            required: true,
            pattern: /^\d{6}$/, // Validate for 6 digits
          })}
          value={pincodeInput}
          onChange={(e) => setPincodeInput(e.target.value)}
        />
        <button
          className="flex-[1] flex items-center gap-1 px-2 self-stretch text-[#ff6536] hover:opacity-50 transition duration-200 text-base sm:text-lg font-medium cursor-pointer"
          type="submit"
        >
          <IoMdLocate size={20} /> Locate
        </button>
      </form>

      <div className="block w-full ">
        <p className={`text-red-500 mt-2 mb-4`}>
          {isFetching && <span>Loading...</span>}
          {!isFetching && availability.max && availability.min && (
            <span className="text-black font-bold font-sans text-sm">
              Delivery FREE by <span className=" text-[#309c37]">{availability.max} &nbsp; <br /></span>
              <p> Assembly ₹799 Provided by TAK Decor (optional)</p>
            </span>
          )}
          {errors?.pincode?.type === 'required' && 'Pincode is required'}
          {errors?.pincode?.type === 'pattern' && 'Pincode must be 6 digits'}
          {errors?.pincode?.type === 'custom' && errors.pincode.message}
        </p>
      </div>
    </>
  );
};

export default PincodeChecker;
