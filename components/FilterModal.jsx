import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import { useForm } from "react-hook-form";
import Rating from "./Rating";
import { setLazyProp } from "next/dist/server/api-utils";
import ColorFilter from "./ColorFilter";

const FilterModal = ({
  isOpen,
  setIsOpen,
  setProducts,
  receivedProducts,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();


  // let fiveStarProducts = receivedProducts.filter(item => item.attributes.rating >= 5);
  //  fiveStarProducts = fiveStarProducts.length;
  // let fourStarProducts = receivedProducts.filter(item => item.attributes.rating >= 4);
  // fourStarProducts = fourStarProducts.length;
  // let threeStarProducts = receivedProducts.filter(item => item.attributes.rating >= 3);
  // threeStarProducts  = threeStarProducts.length;
  // let twoStarProducts = receivedProducts.filter(item => item.attributes.rating >= 2);
  // twoStarProducts = twoStarProducts.length;
  // let oneStarProducts = receivedProducts.filter(item => item.attributes.rating >= 1);
  // oneStarProducts = oneStarProducts.length;

  const starProducts = (stars) => {
    let filteredProducts = receivedProducts.filter(item => Math.floor(Number(item.attributes.ratings)) == stars);
    console.log("FILERED LENGTH", filteredProducts.length)
    return filteredProducts.length;
  }


  const filterByPrice = (data) => {
    let { min, max } = data;

    if (min === "" && max == "") {
      setProducts(receivedProducts);
    }

    let filteredProducts = receivedProducts.filter((p) => {
      if (
        p.attributes.selling_price >= min &&
        p.attributes.selling_price <= max
      ) {
        return p;
      }
    });

    console.log("FILTERED PRODUCTS --> ", filteredProducts)

    setProducts(filteredProducts);
    setIsOpen(false);
  };

  const filterByRating = (rating) => {
    let filteredProducts = receivedProducts.filter((p) => {

      console.log("product rating", p.attributes.ratings)

      if (Math.floor(Number(p.attributes.ratings)) == rating || Math.floor(Number(p.attributes.ratings)) > rating) {
        console.log("true");
        return p;
      }
    });

    console.log("FILTERED PRODUCTS", filteredProducts);


    if (filteredProducts.length > 0) {
      setProducts(filteredProducts);
    } else {
      setProducts([]);
    }

    setIsOpen(false)
    return filteredProducts;
  };


  return isOpen ? (
    <div className="fixed w-full h-full top-0 left-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{
          x: "-100%",
        }}
        animate={{
          x: 0,
        }}
        className="bg-white lg:w-[300px] md:w-[350px] sm:w-[300px] w-[300px] py-2 flex flex-col items-center gap-4 px-4 h-screen fixed top-0 left-0 overflow-y-auto"
      >
        <AiOutlineClose
          onClick={() => setIsOpen(false)}
          size={30}
          className="absolute top-2 right-2 text-gray-600 hover:bg-gray-200 hover:text-black transition rounded-full p-1 cursor-pointer"
        />
        <p className="text-center text-lg font-semibold">Filter Products</p>
        {/* PRICE FILTER START */}
        <div className="w-full flex flex-col gap-2 border-y-[1px] border-y-gray-400 py-4">
          <p className="font-semibold">By Price</p>
          <form
            className="flex flex-wrap gap-1"
            onSubmit={handleSubmit(filterByPrice)}
          >
            <input
              className="flex-1 py-2 px-2 w-full border-2 border-gray-300 rounded-lg"
              type="number"
              placeholder="Min ₹0+"
              {...register("min")}
            />
            <span className="flex-[0.5] w-full text-center self-center">
              --
            </span>
            <input
              className="flex-1 py-2 px-2 border-2 w-full border-gray-300 rounded-lg"
              type="number"
              placeholder="Max"
              {...register("max")}
            />

            <input
              className="block w-full bg-[#ff6536] p-2 rounded-md text-white cursor-pointer hover:opacity-50 transition"
              type="submit"
              value="Apply"
            />
          </form>
        </div>
        {/* PRICE FILTER END */}

        {/* RATING FILTER START */}
        <div className="w-full flex flex-col gap-2 border-b-[1px] border-b-gray-400 pb-4">
          <p className="font-semibold">By Rating</p>
          <ul className="flex flex-col gap-1">
            {[5, 4, 3, 2, 1].map((item, i) => (
              <li
                onClick={() => filterByRating(item)}
                key={i}
                className="text-2xl py-1 flex items-center cursor-pointer hover:bg-gray-200 transition rounded-lg"
              >
                <Rating key={i} rating={item} />
                <span className="text-sm ml-2">Stars &nbsp; {` (${starProducts(item)}) `}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* RATING FILTER END */}

        {/* COLOR FILTER START */}
        <div className="w-full flex flex-col gap-2"> 
        <p className="font-semibold">By Colour</p>
          <ColorFilter setProducts={setProducts} receivedProducts={receivedProducts} />
        </div>
        {/* COLOR FILTER END */}
      </motion.div>
    </div>
  ) : null;
};

export default FilterModal;
