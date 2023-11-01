import React, { useEffect, useMemo, useState } from 'react'
import { BsStopwatchFill } from "react-icons/bs"
import { formatPrice } from '../libs/helper';
import { formatPrice } from '../libs/helper';

const Countdown = ({ countdown, coupon, productPrice }) => {

    let validDate = useMemo(() => countdown, [countdown]);
    const [timer, setTimer] = useState("")
    validDate = new Date(countdown);
    // console.log("valid", validDate.toLocaleString())

    validDate = validDate.getTime();
    let discountAmount = 0

    if(coupon.code === "GIFT") {
        discountAmount = Math.floor((productPrice * coupon.percentage) / 100);

    } else {
        discountAmount = Math.floor((productPrice * coupon.percentage) / 100);
    if(discountAmount > coupon.DiscountAmount) {
        discountAmount = coupon.DiscountAmount;
    }
    }

     

    useEffect(() => {

        let interval = setInterval(() => {
            let difference = new Date((validDate - Date.now()));

            if(difference > 0) {
                setTimer(`${difference.getHours()}h : ${difference.getMinutes()}m : ${difference.getSeconds()}s `)
            }
        },1000);


        return () => {
            clearInterval(interval)
        }

    }, [countdown, validDate]);

  return (
    <div className='flex flex-col gap-1'>
    <p className='font-bold text-green-600'>Today&apos;s Deal <span className='ml-1 text-black text-2xl md:text-3xl'>{formatPrice(coupon.code === "GIFT" ? productPrice : productPrice - discountAmount)}</span> </p>
    <p className="text-xs w-full flex gap-2 items-center sm:text-base text-red-600">Offer Expires in <BsStopwatchFill  /> {timer} </p>
    <p className='text-green-500'>Apply Code : <span className='font-bold text-gray-200 bg-slate-600 px-1'>{coupon.code}</span> To Get {coupon.code === "GIFT" ? <>Gift Card of <span className='font-bold'>{formatPrice(discountAmount)}/-</span></> :`Extra ${coupon.percentage}% Discount` }</p>
    </div>
  )
}

export default Countdown