import React, { useEffect, useState } from "react";
import { addCouponDiscount, addGiftDiscount, updateCart } from "../store/cartSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { fetchDataFromApi } from "../libs/api";
import { useSelector } from "react-redux";
import Loading from "./Loading";


const CouponCode = ({ subTotal }) => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const { cartItems } = useSelector(state => state.cart)

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setMessage("");
      setError("couponCode", null);
      let { couponCode } = data;

      let existingCouponCode = await fetchDataFromApi(
        `api/coupons?filters[code][$eq]=${couponCode}&populate=*`
      );

      if (existingCouponCode.data.length > 0) {
        existingCouponCode = existingCouponCode.data[0];




        let validProductIds = existingCouponCode.attributes.products.data.map((p) => p.id); // Getting the product ids where discount is valid.       
        console.log("Valid Product IDs", validProductIds)

        let validity = existingCouponCode.attributes.validity;

        let validityDate = new Date(validity).getTime();
        let currentDate = new Date().getTime();

        if (validityDate - currentDate > 0) {
          let percentage = Number(existingCouponCode.attributes.percentage);
          let maxDiscount = Number(
            existingCouponCode.attributes.DiscountAmount
          );

          let totalDiscount = 0;


          let updatedCartItems = [];

          if (couponCode === "GIFT") {
            let count = 0;
            updatedCartItems = cartItems.map(p => {
              if (count > 0) {
                return { ...p, couponDiscount: 0, isGift: false }
              }
              let discount = Math.floor((p.oneQuantityPrice * percentage) / 100);
              if (discount > maxDiscount) {
                count++;
                return { ...p, couponDiscount: maxDiscount, isGift: true }
              } else {
                count++;
                return { ...p, id: p.id, couponDiscount: discount, isGift: true }
              }
            })
          } else if(couponCode.startsWith("GIFT")) {
            console.log("RUNNING ELSE IF");
            console.log("EXISTING COUPON CODE", existingCouponCode)
            if(subTotal >= existingCouponCode.attributes.minAmount) {
              let discount = existingCouponCode.attributes.DiscountAmount
              console.log("DISCOUNT Amount", discount)
              dispatch(addGiftDiscount({ discount }));
              setMessage("Coupon Applied")
            } else {
              dispatch(addGiftDiscount({ discount: 0 }));
              setError("couponCode", {
                type: "custom",
                message: `Shop for Min. ₹${existingCouponCode.attributes.minAmount} to avail the offer`
              })
            }
            setIsLoading(false);
            return;
          } else {
            updatedCartItems = cartItems.map(p => {
              if (validProductIds.includes(p.id)) {

                let discount = Math.floor((p.oneQuantityPrice * percentage) / 100);
                if (discount > maxDiscount) {
                  totalDiscount += maxDiscount;
                  return { ...p, couponDiscount: maxDiscount, isGift: false }
                } else {
                  totalDiscount += discount;
                  return { ...p, id: p.id, couponDiscount: discount, isGift: false };
                }
              } else {
                setError("couponCode", {
                  type: "custom",
                  message: "Coupon Code Not Applicable"
                })
                return { ...p, couponDiscount: 0 }
              }
            });
          }

          setMessage("Coupon Code Applied!");



          dispatch(addCouponDiscount({ totalDiscount, updatedCartItems }));

        } else {
          setError("couponCode", {
            type: "custom",
            message: "Coupon Code Expired",
          });
        }
      } else {
        setError("couponCode", {
          type: "custom",
          message: "Invalid Coupon Code",
        });
      }
    } catch (error) {
      console.log(error);
      setError("couponCode", {
        type: "custom",
        message: "Something Went Wrong"
      })
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div>
      <p className="block w-full font-semibold text-base mt-4">
        Got a Coupond Code?
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex gap-3">
        <input
          {...register("couponCode", { required: true })}
          type="text"
          placeholder="Enter Coupon Code"
          className="border-2 border-gray-300 text-base w-full px-2 rounded-lg"
          disabled={isLoading}
          onChange={() => { setMessage("") }}
        />
        <input
          type="submit"
          className="py-2 px-2 bg-[#ff6536] hover:opacity-50 cursor-pointer transition text-white rounded-lg border-[1px] disabled:cursor-not-allowed disabled:opacity-50 font-bold font-mono"
          value="Submit"
          disabled={isLoading}
        />
      </form>
      {
        !errors.couponCode && message && (
          <p className="text-green-500 text-sm text-left py-1">
            {message}
          </p>
        )
      }
      {errors.couponCode?.type === "custom" ? (
        <p className="text-red-500 text-sm text-left py-1">
          {errors.couponCode.message}
        </p>
      ) : null}
      {errors.couponCode?.type === "required" && (
        <p className="text-red-500 text-sm text-left py-2">
          Please enter the Coupon Code
        </p>
      )}
      <Loading loading={isLoading} />
    </div>
  );
};

export default CouponCode;
