import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import CartItem from "../components/CartItem";
import emptyCartImage from "../public/empty-cart.jpg";
import { useDispatch, useSelector } from "react-redux";

import { getSession, signOut, useSession } from "next-auth/react";
import { onOpen } from "../store/loginModalSlice";
import { useRouter } from "next/router";
import logo from "../public/logo.webp";
import { useForm } from "react-hook-form";
import { addCouponDiscount, addGiftDiscount, updateFastDelivery } from "../store/cartSlice";
import CouponCode from "../components/CouponCode";
import CheckoutFooter from "../components/CheckoutFooter";
import Head from "next/head";
const Cart = ({ notSignedIn }) => {
  const [loading, setLoading] = useState(false);
  // Checking if user is authenticated start
  const [isAuthenticated, setIsAuthenticated] = useState(notSignedIn);

  const [hasMounted, setHasMounted] = useState(false)
  const { data: session } = useSession();

  const { cartItems, totalDiscount, isFastDelivery, giftDiscount } = useSelector((state) => state.cart);
  console.log("GIFT DISCOUnt", giftDiscount)
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm();

  useEffect(() => {
    setHasMounted(true)
  }, [])

  let amounts = useMemo(() => {
    let totalOriginalPrice = 0;
    let totalSellingPrice = 0;
    let totalCouponDiscount = 0;
    let totalGiftCardAmount = 0;

    cartItems?.map((p) => {
      totalOriginalPrice += Number(p.attributes.original_price * p.quantity);
      totalSellingPrice += Number(p.attributes.selling_price);

      if (p?.isGift == false) {
        totalCouponDiscount += p.couponDiscount;
      }

      if (p?.isGift == true) {
        totalGiftCardAmount += p.couponDiscount;
      }
    });



    return {
      totalOriginalPrice,
      totalRetailDiscount: totalOriginalPrice - totalSellingPrice,
      totalCouponDiscount,
      subTotal: isFastDelivery ? (totalSellingPrice - totalCouponDiscount + 799 - giftDiscount) : totalSellingPrice - totalCouponDiscount - Number(giftDiscount),
      totalGiftCardAmount
    };
  }, [cartItems, isFastDelivery, giftDiscount]);

  const router = useRouter();

  const clickHandler = () => {
    if (session) {
      router.push("/checkout");
    } else {
      dispatch(onOpen());
    }
  };

  return (
    <>
      <Head>
        <title>Cart - Haroth.com</title>
      </Head>
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
      {
        hasMounted && (
          <><div>
            {cartItems.length > 0 && (
              <>
                {/* HEADING AND PARAGRAPH START */}
                {/* <div className="text-center max-w-[800px] mx-auto sm:pt-16 pt-8 md:mt-0">
              <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
                Shopping Cart
              </div>
            </div> */}
                {/* HEADING AND PARAGRAPH END */}

                {/* CART CONTENT START */}
                <div className="flex flex-col lg:flex-row gap-12 pt-12 px-6 md:px-16 lg:px-32">
                  {/* CART ITEMS START */}
                  <div className="flex-[2] lg:min-h-[500px] max-h-[500px] color-filter flex flex-col gap-8 overflow-y-auto md:pr-2 md:border-r-[1px] md:border-r-gray-300">
                    {cartItems?.map((item) => (
                      <CartItem key={item.id} data={item} />
                    ))}
                  </div>
                  {/* CART ITEMS END */}

                  {/* SUMMARY START */}
                  <div className="flex-[1]">
                    <div className="text-lg font-bold">Summary</div>

                    {/* COUPON CODE START */}
                    <CouponCode subTotal={amounts.subTotal} />
                    {/* COUPON CODE END */}

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
                          <div className="flex w-full justify-between items-start text-green-500">
                            <p className="flex flex-col gap-0">Gift Card: <span onClick={() => {
                              dispatch(addGiftDiscount({ discount: 0 }))
                            }} className="text-red-400 text-xs hover:underline cursor-pointer">Remove</span> </p>
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
                          <p>Installation : </p>
                        </div>
                        {
                          isFastDelivery && `₹799`
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

                    {/* BUTTON START */}
                    <button
                      disabled={loading}
                      onClick={clickHandler}
                      className="w-full py-4 rounded-lg bg-[#ff6536] border-[1px] hover:bg-white hover:text-[#ff6536] text-white text-lg font-medium transition-all active:scale-95 mb-44 duration-200 flex items-center gap-3 justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Checkout
                    </button>
                    {/* BUTTON END */}
                  </div>
                  {/* SUMMARY END */}
                </div>
                {/* CART CONTENT END */}
              </>
            )}

            {/* This is empty Screen */}

            {cartItems?.length < 1 && (
              <div className="flex-[2] flex flex-col items-center pb-[50px] py-16">
                <Image
                  src={emptyCartImage}
                  alt="empty cart image"
                  width={300}
                  height={300}
                />
                <span className="text-xl font-bold">Your cart is empty</span>
                <span className="text-center mt-4">
                  Looks like you have not added anything in your cart.
                  <br />
                  Go ahead and explore top categories.
                </span>
                <Link
                  href="/"
                  className="py-4 px-8 rounded-full bg-[#ff6536] text-white text-lg font-medium active:scale-95 mb-20 hover:bg-[#a14236] hover:text-[#ff6536] transition-all duration-200 border-2 mt-8"
                >
                  Continue Shopping
                </Link>
              </div>
            )}
            {/* This is the end of Empty Screen */}
          </div> </>
        )
      }

      <CheckoutFooter />
    </>
  );
};

export default Cart;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  // Check if session exists or not, if not, redirect
  console.log("Session --> ", session);
  if (session == null) {
    return {
      props: {
        notSignedIn: true,
      },
    };
  }
  return {
    props: {
      notSignedIn: false,
    },
  };
};
