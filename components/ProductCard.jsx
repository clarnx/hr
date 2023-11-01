import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getDiscountedPricePercentage } from "../libs/helper";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { addToCart } from "../store/cartSlice";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useSession } from "next-auth/react";
import { onOpen } from "../store/loginModalSlice";
import { getUserId, wishlist, getWishlistedIds } from "../libs/api";
import WishlistButton from "./WishlistButton";
import { BiSolidCaretUpSquare } from "react-icons/bi";
import Rating from "./Rating";
import hAssuredTag from "../public/hAssuredCroped.png"
import { formatPrice } from "../libs/helper";

const ProductCard = ({ product: completeProduct }) => {

  // console.log("COmplete Product",completeProduct)
  const product = completeProduct.attributes;

  // const [id, setId] = useState(null);

  // const { data:session } = useSession();

  // // if(session) {
  // //   setId(session.user.id);
  // // }

  // console.log("User id  in  product card", id);


  const notify = () => {
    toast.success("Success. Check your cart!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  const dispatch = useDispatch();


  return (
    <div className="w-full relative max-h-fit flex flex-col gap-1 lg:gap-2 overflow-hidden cursor-pointer border border-gray-100 hover:shadow-lg transition-all duration-200 pb-4 bg-white my-2 md:mb-0" suppressHydrationWarning>
      <Link
        className="relative z-10"
        href={`/product/${completeProduct.attributes.slug}`}
        target="_blank"
      >
        <div className="overflow-hidden relative">
          <Image
            alt="Product"
            width={494}
            height={544}
            src={
              product.imageMain.data?.attributes.url.startsWith("/uploads")
                ? `https://tak.haroth.com/${product.imageMain.data?.attributes.url}`
                : product.imageMain.data?.attributes.url.replace("nextjspics.s3.ap-south-1.amazonaws.com", "img.haroth.com")
            }
            className="w-full h-auto object-cover transition-all duration-200 cursor-pointer"
          />
          <WishlistButton productId={completeProduct.id} />
        </div>
      </Link>
      <p className="flex flex-col gap-1 text-xs font-light sm:text-base text-left px-2 sm:px-4">
        {product.Title.slice(0, 70)}...
        <span className="text-sm text-gray-500">
          <span className="text-xs md:text-sm">By {product.brands.data[0].attributes.name}</span>
        </span>
        <span className="flex w-full gap-0 relative mb-2">

          <Rating rating={product.ratings} />
          <span className="text-xs md:text-sm sm:text-base">{`(${product.reviews.data.length})`}</span>
          {
            product.hAssured && <Image className="w-12 sm:w-16 absolute right-0  h-auto " src={hAssuredTag} width={100} height={45} alt="h-Assured" />
          }
        </span>

        
      </p>
      <p className="w-full flex items-baseline px-2 sm:px-4">
        <span className="flex flex-col gap-0">
          <span className="text-[10px] sm:text-xs md:text-sm text-green-700">Today's deal</span>
          <span className="sm:text-lg text-base font-bold lg:tracking-wider">
            {formatPrice(product.selling_price)}{" "}
            <span className="text-[10px] sm:text-sm lg:text-base text-gray-400 font-light line-through">
              {formatPrice(product.original_price)}
            </span>
          </span>
        </span>
        <span className="text-xs sm:text-sm md:text-sm lg:text-base self-end text-green-500 mx-1">
          {Math.ceil(getDiscountedPricePercentage(
            product.original_price,
            product.selling_price
          ))}
          % Off
        </span>
      </p>

      {
        product?.isNew && (
          <div className="absolute px-2 bg-sky-400 text-white top-0 left-0 z-[40]">
            <span className="text-xs sm:text-sm md:text-base  py-0">New</span>
          </div>

        )
      }
    </div>
  );
};

export default ProductCard;
