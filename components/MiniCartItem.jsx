import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";
import { updateCart } from "../store/cartSlice";
import Link from "next/link";
import { useRouter } from "next/router";

const MiniCartItem = ({ product }) => {

    const dispatch = useDispatch();


    const updateCartItem = (e, key) => {
        let payload = {
          key,
          val: key === "quantity" ? parseInt(e.target.value) : e.target.value,
          id: product.id,
        };
        dispatch(updateCart(payload));
      };

  return (
    <div className="flex p-2 gap-2 w-full justify-between" suppressHydrationWarning={true}>
    <Link href={`/product/${product.attributes.slug}`} target="_blank" className="w-1/6 rounded-xl">

      <Image
         src={
          product.attributes.imageMain.data.attributes.url.startsWith("/uploads")
            ? `https://tak.haroth.com/${product.attributes.imageMain.data.attributes.url}`
            : product.attributes.imageMain.data.attributes.url.replace("nextjspics.s3.ap-south-1.amazonaws.com", "img.haroth.com")
        }
        height={150}
        width={150}
        className="w-full rounded-xl"
        alt={product.attributes.Title}
      />
    </Link>

      <div className="w-full text-left justify-self-start font-semibold flex flex-col gap-2 text-sm ">
        {product.attributes.Title}
        
        <div className="flex items-center gap-1 my-2">
          <div className="font-semibold">Quantity:</div>
          <select
            className="hover:text-black"
            onChange={(e) => updateCartItem(e, "quantity")}
            defaultValue="1"
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((q, i) => {
              return (
                <option
                  key={i}
                  value={q}
                >
                  {q}
                </option>
              );
            })}
          </select>
        </div>
      </div>
  
    </div>
  );
};

export default MiniCartItem;
