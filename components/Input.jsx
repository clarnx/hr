import React from 'react'
import { motion } from "framer-motion"

const Input = ({label,type, id, disabled, required, register, errors, spanFull, styles, minLength, maxLength}) => {


  return (
    <div className={`w-full relative flex ${spanFull ? "sm:col-span-2" : "col-span-1"} ${styles && styles} animateOnError`}>
      {/* {formatPrice && (
        <BiDollar
          size={24}  
          className="
            text-neutral-700
            absolute
            top-5
            left-2
          "
        />
      )} */}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required,
            minLength,
            maxLength,
         })}
        placeholder=" "
        type={type}
        className={`
          peer
          w-full
          md:p-4
          p-2
          pt-6
          text-md
          font-light 
          bg-white 
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${errors ? 'border-rose-500' : 'border-neutral-300'}
          ${errors ? 'focus:border-rose-500' : 'focus:border-black'}
          
        `}
      />
      <label 
      htmlFor={id}
        className={`
          absolute 
          md:text-md
          text-sm
          duration-150 
          transform 
          -translate-y-3 
          top-5 
          z-10 
          p-0
          sm:pl-4
          pl-2
          origin-[0]
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${errors ? 'text-rose-500' : 'text-zinc-400'}
        `}
      >
        {label}&nbsp; &nbsp; {errors && errors.type == "required" && `IS REQUIRED`}
        {errors && errors.type == "minLength" && `Min. ${minLength} characters are required`}
        {errors && errors.type == "maxLength" && `Max. ${minLength} characters can be entered`}
      </label>
    </div>
  )
}

export default Input