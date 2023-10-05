import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Loading from "./Loading"
import { IoMdLocate } from 'react-icons/io';
import { getLocation } from "../libs/helper"
import { updateUser } from "../libs/api"
import { toast } from "react-hot-toast"


const AddressInput = ({ type, register, errors, required, minLength, maxLength, defaultValue, label, id, spanFull }) => {
  return (
    <div className={`flex flex-col items-start text-left w-full ${spanFull && "col-span-full"}`}>
      <label className='text-xs text-gray-600 flex gap-4'>{label}
        {errors && <p className="text-xs text-red-500">
          {errors.type === "required" && `${label} is required`}
          {errors.type === "custom" && errors.message}
        </p>}
      </label>
      <input {...register(id, {
        required,
        value: defaultValue,
      })}
        className='border border-gray-200 focus:border-black px-2 py-1 w-full'

      />
    </div>
  )
}

const AddressForm = ({ onSubmit, setIsLoading, isLoading, addressData }) => {

  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
    getValues,
    setError
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='bg-white py-2 px-4 grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4 mt-2'>

      <AddressInput
        register={register}
        id="name"
        label="Name"
        errors={errors.name}
        required={true}
        type='text'
        defaultValue={addressData?.name}
      />

      <AddressInput
        register={register}
        id="email"
        label="Email"
        errors={errors.email}
        required={true}
        type="email"
        defaultValue={addressData?.email}

      />

      <AddressInput
        register={register}
        id="phone_number"
        label="Mobile No."
        errors={errors.phone_number}
        required={true}
        type="number"
        minLength={10}
        defaultValue={addressData?.phone_number}

      />


      <div className={`relative flex flex-col items-start text-left w-full `}>
        <label className='text-xs text-gray-600 flex gap-4'>Pincode
          {errors.pincode && <p className="text-xs text-red-500">
            {errors.pincode.type === "required" && "Pincode is required"}
            {errors.pincode.type === "custom" && errors.pincode.message}
          </p>}

        </label>
        <input
          className='border border-gray-200 focus:border-black px-2 py-1 w-full'
          type="number"
          {...register("pincode", {
            required: true,
            value: addressData?.pincode
          })}
          placeholder="Pincode"
          onChange={(e) => setValue("pincode", e.target.value)}
        />


        <span onClick={async () => { await getLocation(getValues("pincode"), setError, setValue, setIsLoading) }} className="absolute right-2 bottom-[12%] text-[#ff6536] flex items-center cursor-pointer">

          Locate
          <IoMdLocate size={25} />
        </span>
        <Loading loading={isLoading} />
      </div>

      <AddressInput
        register={register}
        id="state"
        label="State"
        errors={errors.state}
        required={true}
        defaultValue={addressData?.state}
      />

      <AddressInput
        register={register}
        id="city"
        label="City"
        errors={errors.city}
        required={true}
        defaultValue={addressData?.city}
      />




      <AddressInput
        register={register}
        id="address"
        label="Address"
        spanFull={true}
        errors={errors.address}
        required={true}
        defaultValue={addressData?.address}
      />



      <input type='submit'
        className='col-span-full bg-[#ff6536] text-white py-1 cursor-pointer hover:opacity-50 disabled:cursor-not-allowed px-4 mx-auto max-w-fit mt-2'
        value="Save"
      />


    </form>
  )
}

const SavedAddresses = ({
  userData
}) => {

  console.log("RE RENDRED")
  const [userInformation, setuserInformation] = useState(userData)
  const [editAddress, setEditAddress] = useState(false)
  const [editOptionalAddress, setEditOptionalAddress] = useState(false)
  const [isLoading, setIsLoading] = useState(false)


  const saveAddress = async (data, e) => {

    try {
      setIsLoading(true);
      const updateRes = await updateUser({
        address: { ...data }
      }, userInformation.id)


      toast.success("Updated Address");

      if (updateRes?.id) {
        setuserInformation(updateRes)
      }


      setEditAddress(false);

    } catch (error) {
      console.log(error);
      toast.error("Error Updating Address");
    }
    finally {
      setIsLoading(false)
    }

  }

  const saveOptionalAddress = async (data, e) => {

    try {
      setIsLoading(true);
      const updateRes = await updateUser({
        optionalAddress: { ...data }
      }, userInformation.id)


      toast.success("Updated Address");

      if (updateRes?.id) {
        setuserInformation(updateRes)
      }



      setEditOptionalAddress(false);

    } catch (error) {
      console.log(error);
      toast.error("Error Updating Address");
    }
    finally {
      setIsLoading(false)
    }

  }
  return (
    !userInformation?.address ? <div className='w-full text-left'>

      <button onClick={() => setEditAddress(prev => !prev)} className='mt-4 mr-auto bg-[#ff6536] text-white shadow-sm px-4 py-1 max-w-fit hover:opacity-50' >
        {editAddress ? "Close X" : "Add new address"}
      </button>
      {editAddress && <AddressForm addressData={userInformation?.address} onSubmit={saveAddress} setIsLoading={setIsLoading} />}
    </div>
      : (
        <div className='flex flex-col items-start'>
          <h3 className="text-2xl font-bold text-left">Saved Addresses</h3>

          <div className='flex flex-col md:flex-row w-full gap-4 mt-4 '>
            <div className='flex-col gap-2'>
              <div className='flex flex-col gap-0 items-start bg-white border border-gray-200 px-4 md:pr-10 py-1 shadow-md min-w-full md:max-w-fit self-start max-h-fit'>
                <span className='w-full flex justify-between items-baseline'>{userInformation?.address.name} <button className='ml-auto text-[#ff6536]' onClick={() => setEditAddress(prev => !prev)}>{editAddress ? "Close" : "Edit"}</button></span>
                <span>{userInformation?.address.address}</span>
                <span>{userInformation?.address.state}, {userInformation?.address.city}</span>
                <span>{userInformation?.address?.phone_number}</span>
                <span>{userInformation?.address?.email}</span>

              </div>
              {editAddress && <AddressForm addressData={userInformation?.address} onSubmit={saveAddress} setIsLoading={setIsLoading} />}
            </div>

            {userInformation?.optionalAddress ? (
              <>
                <div className='flex-col gap-2'>
                  <div className='flex flex-col gap-0 items-start bg-white border border-gray-200 px-4 md:pr-10 py-1 shadow-md w-full md:max-w-fit self-start max-h-fit'>
                    <span className='w-full flex justify-between items-baseline'>{userInformation?.optionalAddress.name} <button className='ml-auto text-[#ff6536]' onClick={() => setEditOptionalAddress(prev => !prev)}>{editOptionalAddress ? "Close" : "Edit"}</button></span>
                    <span>{userInformation?.optionalAddress.address}</span>
                    <span>{userInformation?.optionalAddress.state}, {userInformation?.optionalAddress.city}</span>
                    <span>{userInformation?.optionalAddress?.phone_number}</span>
                    <span>{userInformation?.optionalAddress?.email}</span>

                  </div>

                  {editOptionalAddress && <AddressForm onSubmit={saveOptionalAddress} addressData={userInformation?.optionalAddress} setIsLoading={setIsLoading} />}
                </div>
              </>
            ) : (
              <>
                {editOptionalAddress && <AddressForm onSubmit={saveOptionalAddress} setIsLoading={setIsLoading} />}
                <button className='col-span-full bg-[#ff6536] text-white py-1 cursor-pointer hover:opacity-50 disabled:cursor-not-allowed px-4  max-w-fit  shadow-sm self-start'
                  onClick={() => setEditOptionalAddress(prev => !prev)}
                >{editOptionalAddress ? "Close" : "Add More"}</button>
              </>
            )}
          </div>
          <Loading loading={isLoading} />
        </div>
      )
  )
}

export default SavedAddresses




