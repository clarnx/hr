import Image from "next/image";
import React from "react";
import { removeFromCart, updateCart, updateCartItem } from "../store/cartSlice";
import { useDispatch } from "react-redux";
import { BsFillTrashFill } from "react-icons/bs";
import Link from "next/link";

const CartItem = ({ data }) => {
  console.log("data", data);

  const dispatch = useDispatch();

  const updateCartItem = (e, key) => {
    let payload = {
      key,
      val: key === "quantity" ? parseInt(e.target.value) : e.target.value,
      id: data.id,
    };
    dispatch(updateCart(payload));
  };

  return (
    <div className="flex items-start sm:items-start gap-4 rounded-lg">
      <Link href={`/product/${data.attributes.slug}`} target="_blank">
        <Image
          src={
            data.attributes.imageMain.data.attributes.url.startsWith("/uploads")
              ? `https://tak.haroth.com/${data.attributes.imageMain.data.attributes.url}`
              : data.attributes.imageMain.data.attributes.url.replace("nextjspics.s3.ap-south-1.amazonaws.com", "img.haroth.com")
          }
          width={300}
          height={300}
          className="w-[100px] sm:w-[130px] md:w-[180px] lg:w-[230px] h-auto flex-[1] rounded-lg"
          alt="image"
        />
      </Link>

      <div className="flex-[3] w-full">
        <p className="text-sm sm:text-base md:text-lg lg:md:text-xl font-bold flex flex-col">
          {data.attributes.Title}
          <span className="text-[10px]  sm:text-sm text-[#ff6536]">
            BY {data.attributes.brands.data[0].attributes.name.toUpperCase()}
          </span>
        </p>

        <div className="flex items-center gap-1 my-2">
          <div className="font-semibold text-sm sm:text-base">Quantity:</div>
          <select
            className="hover:text-black"
            onChange={(e) => updateCartItem(e, "quantity")}
            defaultValue={data.quantity || "1"}
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((q, i) => {
              return (
                <option defaultValue="1" key={i} value={q}>
                  {q}
                </option>
              );
            })}
          </select>
          <BsFillTrashFill
            onClick={() => dispatch(removeFromCart(data))}
            size={35}
            className="ml-4 hover:bg-gray-200 p-2 rounded-full cursor-pointer"
          />
        </div>

        {/* ITEM PRICE START */}
        <div className="mt-4 w-full flex flex-col gap-1 text-sm md:text-base">
          <p className=" flex w-full sm:w-1/2 justify-between text-sm md:text-base">
            <span>MRP:</span>
            <span>
              {" "}
              ₹
              {data.quantity
                ? data.quantity * data.attributes.original_price
                : data.attributes.original_price}
            </span>
          </p>
          <p className="text-green-500 flex w-full sm:w-1/2 justify-between">
            <span>Retail Discount: </span>
            <span>
              ₹
              {data.oneQuantityPrice
                ? (data.attributes.original_price - data.oneQuantityPrice) *
                  data.quantity
                : data.attributes.original_price -
                  data.attributes.selling_price}
            </span>
          </p>
          {data.couponDiscount > 0 && (
            <p className="text-green-500 font-bold flex w-full sm:w-1/2 justify-between text-sm md:text-base">
              <span>Coupon Discount: </span>
              <span>{data.couponDiscount}</span>
            </p>
          )}

          <p className=" flex w-full sm:w-1/2 justify-between font-bold text-base md:text-lg border-y-[1px] border-y-gray-300">
            <span>Final Price: </span>
            <span>
              ₹
              {data?.couponDiscount > 0 && data?.isGift == false
                ? data.attributes.selling_price - data.couponDiscount
                : data.attributes.selling_price}
            </span>
          </p>

          {data.couponDiscount > 0 && data?.isGift && (
            <p className=" flex w-full sm:w-1/2 justify-between text-sm md:text-base text-green-400 justify-self-end pt-2">
              Congratulations! You&apos;re getting a free Gift Card of ₹
              {data.couponDiscount}
            </p>
          )}
        </div>
        {/* ITEM PRICE END */}
      </div>
    </div>
  );
};

export default CartItem;
