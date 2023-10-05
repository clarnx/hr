import React from "react";
import Image from "next/image";
import Rating from "./Rating";
import WishlistButton from "./WishlistButton";
import Link from "next/link";
import hAssuredTag from "../public/hAssuredCroped.png";
import { getDiscountedPricePercentage } from "../libs/helper";

const MinimalProductCard = ({ product: completeProduct, showPrice }) => {
  const product = completeProduct.attributes;

  return (
    <div
      className="w-full relative min-h-min flex flex-col gap-2 overflow-hidden cursor-pointer pb-4 bg-[#f8f8f8] hover:shadow-lg transition-all duration-200 mb-2"
      suppressHydrationWarning
    >
      <Link
        className="relative z-10"
        href={`/product/${completeProduct.attributes.slug}`}
        target="_blank"
      >
        <div className="overflow-hidden relative">
          <Image
            alt="Product"
            width={200}
            height={100}
            src={
              product.imageMain.data?.attributes.url.startsWith("/uploads")
                ? `https://tak.haroth.com/${product.imageMain.data?.attributes.url}`
                : product.imageMain.data?.attributes.url.replace(
                    "nextjspics.s3.ap-south-1.amazonaws.com",
                    "img.haroth.com"
                  )
            }
            className="w-full h-auto cursor-pointer"
          />
          <WishlistButton productId={completeProduct.id} />
        </div>
      </Link>
      <p className="flex flex-col gap-1 text-left px-2 md:px-4">
        {product.Title.slice(0, 20)}...
        <span className="flex w-full gap-2 relative">
          <Rating rating={product.ratings} />
          {product.hAssured && (
            <Image
              className="w-12 sm:w-16 absolute right-0 sm:right-1/3 h-auto "
              src={hAssuredTag}
              width={100}
              height={45}
              alt="h-Assured"
            />
          )}
        </span>
      </p>

      {showPrice && (
        <p className="font-bold px-2 md:px-4 text-sm sm:text-base md:text-lg lg::text-xl  flex items-baseline gap-2">
          ₹{product.selling_price}
          <span className="line-through text-xs md:text-sm text-gray-500 font-normal ">
            ₹{product.original_price}
          </span>
          <span className="text-green-600 text-xs md:text-sm font-normal">
            ({Math.ceil(getDiscountedPricePercentage(
              product.original_price,
              product.selling_price
            ))}
            % off)
          </span>
        </p>
      )}
      
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

export default MinimalProductCard;
