import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { onOpen } from "../store/loginModalSlice";
import { getWishlistedIds, wishlist } from "../libs/api";
import { BsReverseLayoutTextWindowReverse } from "react-icons/bs";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const WishlistButton = ({ productId, isLarge }) => {

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const {data: session} = useSession();


  let id = null;
  if(!session){
    id= null;
  } else {
    id = session.id;
  }

  // console.log("id in wishlist", id);
  // console.log("product id in wishlist ", productId)

  // const [wishlistedIds, setWishlistedIds] = useState(null)

  const router = useRouter();
  

  useEffect(() => {
    if(id !== null) {

      getWishlistedIds(id).then(res => {
        console.log("Wishlisted Ids", res);
        if(res && res.includes(productId)) {
          setIsWishlisted(true);
        } else {
          setIsWishlisted(false)
        }
      })
    }
  }, [id, productId])

  // console.log("RECEIVED User id ", id)

  const dispatch = useDispatch();
      
  const createWishlist = async () => {
    if(!id) {
      dispatch(onOpen());
      return;
    }      
    await wishlist(id, productId, isWishlisted);

    
  }

  return (
    <button
      onClick={async (e) => {
        setIsLoading(true)
        e.preventDefault();
        e.stopPropagation();
        await createWishlist();
        setIsLoading(false)
        setIsWishlisted((prev) => !prev);
      }}
      className={`absolute z-30 ${isLarge ? "top-2 right-2 max-sm:right-2 max-md:right-2" : "bottom-2 right-2"}  rounded-full p-1 cursor-pointer`}
    >
      <AiFillHeart className={`bg-black/20 rounded-full p-1 shadow-[2px 2px 1px white] ${isWishlisted ? 'text-red-500' : 'text-white'}`} size={isLarge ? 40 : 30} />
    </button>
  );
};

export default WishlistButton;
