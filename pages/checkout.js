import React, { useEffect, useMemo, useState } from "react";

import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import MiniCartItem from "../components/MiniCartItem";
import Loading from "../components/Loading";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { createOrder, fetchDataFromApi, getUser, getUserId, updateUser } from "../libs/api";
import { initializeRazorpay } from "../libs/helper";
import { clearCart } from "../store/cartSlice";
import { toast } from "react-hot-toast";
import logo from "../public/logo.webp";
import Link from "next/link";
import Image from "next/image";
import CheckoutFooter from "../components/CheckoutFooter";

import { IoMdLocate } from "react-icons/io";
import { getLocation, sendOtp, verifyOtp, isEqual } from "../libs/helper.js"


const CheckoutFormInput = ({ register, required = false, id, label, errors, spanFull, minLength, maxLength, type }) => {


  return (
    <div className={`flex w-full flex-col ${spanFull && "col-span-full"}`}>
      <label className="flex gap-2 items-baseline" htmlFor={id}>{label}
        {errors && <p className="text-xs sm:text-sm left-0 text-red-500">
          {errors.type === "required" && `${label} is required`}
          {errors.type === "custom" && errors.message}
        </p>}
      </label>
      <input
        {...register(id, {
          required,
          minLength,
          maxLength
        })}
        id={id}
        type={type}
        className={`border border-gray-300 rounded-md px-2 py-1 w-full`}
        placeholder={label}
      />
    </div>
  )
}

const CheckoutPage = ({ userData }) => {
  const [hasMounted, setHasMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [usingAddress, setUsingAddress] = useState(0);

  console.log("RERENDERED");


  const { cartItems, totalDiscount, isFastDelivery, giftDiscount } = useSelector((state) => state.cart);

  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
    setError,
    getValues,
    setFocus
  } = useForm();

  console.log("SESSION", session)


  const router = useRouter();

  const dispatch = useDispatch();

  let amounts = useMemo(() => {
    let totalOriginalPrice = 0;
    let totalSellingPrice = 0;
    let totalCouponDiscount = 0;
    let totalGiftCardAmount = 0;

    cartItems?.map((p) => {
      totalOriginalPrice += Number(p.attributes.original_price * p.quantity);
      totalSellingPrice += Number(p.attributes.selling_price);
      
      if(p?.isGift == false) {
        totalCouponDiscount += p.couponDiscount;
      }
      
      if(p?.isGift == true) {
        totalGiftCardAmount += p.couponDiscount;
      }
    });

    

    return {
      totalOriginalPrice,
      totalRetailDiscount: totalOriginalPrice - totalSellingPrice,
      totalCouponDiscount,
      subTotal: isFastDelivery ? (totalSellingPrice - totalCouponDiscount + 399 - giftDiscount) : totalSellingPrice - totalCouponDiscount - Number(giftDiscount),
      totalGiftCardAmount
    };
  }, [cartItems, isFastDelivery, giftDiscount]);


  const onSubmit = async (data) => {
    const series = 5000;
    console.log("USER Data", data);

    if (!session) {
      alert("You are not signed in");
      router.push("/");
    }

    try {
      setIsLoading(true);

      const res = await initializeRazorpay();
      const { id, user } = session;
      console.log("User ID ", id);
      console.log("Fetched userData", id);

      if (!res) {
        alert("Razorpay SDK Failed to load");
        return;
      }

      const razorpayResponse = await fetch(`/api/razorpay`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id, totalAmount: amounts.subTotal }),
      }).then((res) => res.json());

      console.log("Razorpay response", razorpayResponse);
      console.log("Razorpay amount", razorpayResponse.amount);

      let options = {
        key: "rzp_live_xqIprz2t9mSYLr", // Enter the Key ID generated from the Dashboard,

        name: "HAROTH.COM",
        currency: razorpayResponse.currency,
        amount: razorpayResponse.amount,
        order_id: razorpayResponse.id,
        description: "Thankyou For Shopping With Us",
        image: logo,
        handler: async function (response) {
          console.log("RESPONSE", JSON.stringify(response));
          let newOrder = {
            name: data.name,
            address: data.address,
            products: JSON.parse(JSON.stringify(cartItems)),
            email: data.email,
            transaction_id: response.razorpay_payment_id,
            orderId: razorpayResponse.id,
            amount: amounts.subTotal,
            order_status: "created",
            admin_user: {
              connect: [id],
            },
            phoneNumber: Number(data.phone_number),
            user_id: id,
            state: data.state,
            city: data.city,
            isFastDelivery
          };

          const orderResponse = await createOrder("api/orders", newOrder);

          if (!userData?.address) {
            const updateResponse = await updateUser({ address: data }, userData?.id);
          }

          if (userData?.address && !userData?.optionalAddress && !(isEqual(data, userData?.address))) {
            const updateResponse = await updateUser({ optionalAddress: data }, userData?.id);
          }

          if (orderResponse.data) {
            toast.success("ORDER CREATED SUCCESSFULLY!");



            router.push("/success");
            dispatch(clearCart());
          }
          console.log(orderResponse);
        },
        prefill: {
          name: data.name,
          email: data.email,
          contact: data.phone,
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      paymentObject.on("payment.failed", function (response) {
        console.log("response", response);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const setAddress = (address) => {
    setValue("name", address?.name);
    setValue("phone_number", address?.phone_number);
    setValue("pincode", address?.pincode);
    setValue("state", address?.state);
    setValue("city", address?.city);
    setValue("email", address?.email);
    setValue("address", address?.address)
  }

  return (
    <>
         <header className="flex w-screen justify-between px-6 md:px-16 lg:px-32 items-center py-2 bg-white shadow-md">
        <Link href="/">
          <Image src={logo} width={200} height={200} alt="logo" className="max-sm:w-[150px]" />
        </Link>
        <p className="flex flex-col gap-0 items-end">
          <span className="text-gray-600 text-sm">Got Any Questions?</span>
          <span className="text-[#ff6536] text-sm sm:text-base md:text-lg lg:text-xl font-bold">
            Call : +91 9868489009
          </span>
        </p>
      </header>
      <section className="w-screen px-6 md:px-16 lg:px-32" id="checkout">
        <div className="flex flex-col lg:flex-row py-8 gap-8 min-h-max">
          <div className="w-full flex-[1.5] flex flex-col bg-white">

            {/* <div className="">
            Delivering to:
            
            <div>
              <p>Name: {userData?.username}</p>
              <p>Mobile No.: {userData?.phone_number}</p>
              <p>Address : {userData?.address}</p>
            </div>
          </div> */}

            <p className="font-bold text-left text-lg md:text-xl p-2 mb-2 md:mb-4">Enter Shipping Details</p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white max-h-fit p-2  grid grid-cols-1 gap-4 gap-y-4 w-full self-start"
              id="checkout-form"
            >

              <CheckoutFormInput
                register={register}
                id="name"
                label="Name"
                type="text"
                errors={errors.name}
                required={true}
              />
              <CheckoutFormInput
                register={register}
                id="phone_number"
                label="Mobile Number"
                required={true}
                errors={errors.phone_number}
                minLength={10}
                maxLength={10}
                type="number"
              />
              <CheckoutFormInput
                register={register}
                id="email"
                label="Email"
                errors={errors.email}
                type="email"
              />

              <div className="relative flex flex-col w-full h-fit">
                <label className="flex gap-2 items-baseline" htmlFor="pincode">Pincode
                  {errors.pincode && <p className="text-xs sm:text-sm left-0 text-red-500">
                    {errors.pincode.type === "required" && "Pincode is required"}
                    {errors.pincode.type === "custom" && errors.pincode.message}
                  </p>}

                </label>
                <input
                  className={`border border-gray-300 rounded-md px-2 py-1 w-full `}
                  type="number"
                  {...register("pincode", {
                    required: true
                  })}
                  id="pincode"
                  placeholder="Pincode"
                  onChange={(e) => setValue("pincode", e.target.value)}
                />

                <span onClick={async () => { await getLocation(getValues("pincode"), setError, setValue, setIsLoading) }} className="absolute right-2 bottom-[12%] text-[#ff6536] flex items-center cursor-pointer">

                  Locate
                  <IoMdLocate size={25} />
                </span>
              </div>

              <CheckoutFormInput
                register={register}
                id="state"
                label="State"
                errors={errors.state}
                type="text"
                required={true}
              />

              <CheckoutFormInput
                register={register}
                id="city"
                label="City"
                errors={errors.city}
                type="text"
                required={true}
              />
              <CheckoutFormInput
                register={register}
                id="address"
                label="Address"
                errors={errors.address}
                type="text"
                spanFull={true}
                required={true}
              />





              <Loading loading={isLoading} />

            </form>
          </div>
          {hasMounted && (
            <>
              {/* MINI CART START */}
              <div className="flex-[1] md:flex lg:max-w-[75%] flex-col bg-transparent gap-2 w-full  place-self-start ml-auto">

                {/* USER ADDRESS START */}
                <div className=" mb-4">
                  <p className="py-1 font-bold">Saved Adresses</p>

                  <div className="flex flex-col gap-2 mb-2">
                    {
                      userData?.address ? (
                        <div className="px-4 py-1 flex w-full justify-between items-center bg-white shadow-md border border-gray-300 text-xs sm:text-sm text-gray-600">
                          <div>
                            <div className="flex flex-col sm:flex-row gap-0 sm:gap-2">
                              <p>Name: {userData?.address?.name}</p>
                              <p>Ph: {userData?.address?.phone_number}</p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-0 sm:gap-2">
                              <p>State: {userData?.address?.state}</p>
                              <p>City: {userData?.address?.city}</p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-0 sm:gap-2">

                              <p>Address: {userData?.address?.address}</p>
                              <p>Pincode: {userData?.address?.pincode}</p>
                            </div>
                          </div>
                          <button onClick={() => {
                            setAddress(userData?.address)
                            setUsingAddress(1);
                          }} className="bg-[#ff6536] hover:opacity-50 px-2 py-1 max-h-fit max-w-fit text-white">{usingAddress == 1 ? "Using" : "Use This"}</button>
                        </div>
                      ) : <button className="bg-[#ff6536] text-white px-2 py-1 max-w-fit" onClick={() => setFocus("name")}>Add Address</button>
                    }

                    {
                      userData?.optionalAddress && (
                        <div className="px-4 py-1 flex w-full justify-between items-center bg-white shadow-md border border-gray-300 text-xs sm:text-sm text-gray-600">
                          <div>
                            <div className="flex flex-col sm:flex-row gap-0 sm:gap-2">
                              <p>Name: {userData?.optionalAddress?.name}</p>
                              <p>Ph: {userData?.optionalAddress?.phone_number}</p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-0 sm:gap-2">
                              <p>State: {userData?.optionalAddress?.state}</p>
                              <p>City: {userData?.optionalAddress?.city}</p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-0 sm:gap-2">

                              <p>Address: {userData?.optionalAddress?.address}</p>
                              <p>Pincode: {userData?.optionalAddress?.pincode}</p>
                            </div>
                          </div>
                          <button onClick={() => {
                            setAddress(userData?.optionalAddress)
                            setUsingAddress(2);
                          }} className="bg-[#ff6536] hover:opacity-50 px-2 py-1 max-h-fit max-w-fit text-white">{usingAddress == 2 ? "Using" : "Use This"}</button>
                        </div>
                      )
                    }
                  </div>
                </div>
                {/* USER ADDRESS END */}

                <div className="shadow-md">
                  <div className="bg-white w-full py-1 mb-2 shadow-sm pl-2 border border-gray-200">
                    Order Summary
                  </div>
                  <div className="h-fit max-h-[280px] overflow-y-auto touch-pan-y">
                    {cartItems.map((item, i) => (
                      <MiniCartItem key={i} product={item} />
                    ))}
                  </div>
                  {/* SUBTOTAL START */}
                  <div className="p-5 my-5 bg-black/[0.05] rounded-xl flex flex-col gap-2 w-full">
                    <div className="flex w-full justify-between items-center">
                      <p>TOTAL: </p>
                      <p>₹{amounts.totalOriginalPrice}</p>
                    </div>
                    <div className="flex w-full justify-between items-center text-green-500">
                      <p>Retail Discount: </p>
                      <p>₹{amounts.totalRetailDiscount}</p>
                    </div>
                    {
                      amounts.totalCouponDiscount > 0 && (
                        <div className="flex w-full justify-between items-center text-green-500">
                          <p>Coupon Discount:</p>
                          <p>₹{amounts.totalCouponDiscount}</p>
                        </div>
                      )
                    }

                    {
                      giftDiscount > 0 && (
                        <div className="flex w-full justify-between items-center text-green-500">
                          <p>Gift Card:</p>
                          <p>₹{giftDiscount}</p>
                        </div>
                      )
                    }

                    {
                      amounts.totalGiftCardAmount > 0 && (
                        <div className="flex w-full justify-between items-center text-green-500">
                          <p>Gift Card: </p>
                          <p>₹{amounts.totalGiftCardAmount}</p>
                        </div>
                      )
                    }

                    <div className="flex mt-2 w-full justify-between items-center">
                      <div className="flex gap-2 items-center">
                        <input type="checkbox" onChange={(e) => {
                          dispatch(updateFastDelivery());

                        }} />
                        <p>Add Fast Delivery: </p>
                      </div>
                      {
                        isFastDelivery && `₹399`
                      }
                    </div>

                    <div className="flex mt-2 w-full justify-between items-center text-lg font-bold">
                      <p>SUBTOTAL: </p>
                      <p className="flex flex-col text-right">₹{amounts.subTotal}
                        <span className="text-xs font-normal text-gray-600">{`(Inclusive of all taxes)`}</span>
                      </p>
                    </div>

                  </div>
                  <p className="mb-2 text-green-500 text-center">You will save a total of <span className="font-bold">₹{amounts.totalOriginalPrice - amounts.subTotal}</span>  on this order!</p>
                  {/* SUBTOTAL END */}
                </div>

                <input
                  className="max-h-fit text-lg md:text-xl w-full ml-auto bg-[#ff6536] text-white rounded-lg px-4 py-2 hover:bg-[#b24516] hover:text-[#ff6536] transition duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                  value="Checkout"
                  form="checkout-form"
                  disabled={isLoading}
                />
              </div>
              {/* MINI CART END */}
            </>
          )}
        </div>
      </section>
      <CheckoutFooter />
    </>
  );
};

export default CheckoutPage;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  // Check if session exists or not, if not, redirect
  console.log("Session --> ", session);
  if (session == null) {
    return {
      redirect: {
        destination: "/not-authenticated",
      },
    };
  }


  const userData = await fetchDataFromApi(`api/users/${session.id}`);

  return {
    props: {
      userData
    },
  };
};


