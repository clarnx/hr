import React, { useState } from 'react'
import { AiOutlineClose, AiOutlineEdit } from 'react-icons/ai'
import { useForm } from 'react-hook-form';
import { updateUser } from '../../libs/api';
import Loading from "../Loading"

const ProfileInput = ({
    register, error, label, type, id, name, placeholder, editMode
}) => (
  <div className="flex flex-col w-full items-start text-base md:text-lg gap-1">
    <label htmlFor={id} className="font-bold min-w-max">{label}: </label>
    <input
      id={id}
      className="placeholder:text-black w-full px-4 py-1 border border-gray-200"
      type={type}
      {...register(`${name}`,)}
      placeholder={placeholder}
    />

  </div>
  )



const Profile = ({ userData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isTouched, setIsTouched] = useState(false)
  const [editMode, setEditMode] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
    reset,
  } = useForm();


  const onSubmit = async (data) => {

    const { name, email, phone, address } = data;

    try {
      setIsLoading(true);

      let updateData = {
        username: name.length > 0 ? name : userData.username,
        email : email.length > 0 ? email : userData.email , 
        phone_number: phone.length > 0 ? phone : userData.phone_number,
        address
      }
  
      let res = await updateUser(updateData, userData.id);

      if(res.status == 200 ){
        toast.success("Updated User Information!")
      }

      
    } catch (error) {
      console.log(error);
      toast.error("Error Updating User Information");
    }
    finally {
      setIsLoading(false)
    }

   


  }



  return (
    <div className="mx-auto flex gap-4 items-center justify-center w-full">
      <div className="w-full py-4">
        {!userData ? (
          <p className="w-full text-center text-3xl">
            Unable to fetch user data
          </p>
        ) : (
          <>   
            <form onSubmit={handleSubmit(onSubmit)} className="flex md:w-1/2 w-full flex-col items-start justify-between  py-4 gap-y-8">
              <ProfileInput
                register={register}
                type="text"
                name="name"
                id="name"
                label="Name"
                error={errors.name}
                placeholder={userData.username}
                editMode={editMode}
                disabled={isLoading}
                setIsTouched={setIsTouched}
              />
              <ProfileInput
                register={register}
                type="email"
                name="email"
                id="email"
                label="Email"
                error={errors.email}
                placeholder={userData.email}
                editMode={editMode}
                disabled={isLoading}
                setIsTouched={setIsTouched}
              />
              <ProfileInput
                register={register}
                type="number"
                name="phone"
                id="phone"
                label="Phone No"
                error={errors.phone}
                placeholder={userData.phone_number}
                editMode={editMode}
                disabled={isLoading}
                setIsTouched={setIsTouched}
              />
              <input
                type="submit"
                className="text-center bg-[#ff6536] max-w-max text-white border border-black mx-auto px-4 py-1 rounded-xl text-xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                value="Save"
                disabled={!isDirty || isLoading}
              />
            </form>
          </>
        )}
      </div>
      <Loading loading={isLoading} />
    </div>
  )
}

export default Profile