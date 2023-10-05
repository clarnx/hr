import React, { useState } from "react";

const SortFilter = ({products, setProducts, receivedProducts}) => {



  return (
    <p
      onClick={() => {
        setOpenSortModal((prev) => !prev);
      }}
      className="cursor-pointer relative text-base sm:text-lg font-bold"
    >
      Sort by {sortMode}
      {openSortModal && (
        <span className="absolute rounded-lg top-4 -left-[200px] z-[1000] flex flex-col gap-0  bg-transparent shadow-xl min-w-[160px] sm:min-w-[200px] text-center">
          <span
            onClick={() => sortProducts("relevance")}
            className="w-full bg-white rounded-lg border-[1px] py-2 border-gray-200 text-xs sm:text-sm md:text-base px-2 hover:bg-gray-200 transition"
          >
            Relevance
          </span>
          <span
            onClick={() => sortProducts("price:high-to-low")}
            className="w-full bg-white rounded-lg border-[1px] py-2 border-gray-200 text-xs sm:text-sm md:text-base px-2 hover:bg-gray-200 transition"
          >{`Price: High to Low`}</span>
          <span
            onClick={() => sortProducts("price:low-to-high")}
            className="w-full bg-white rounded-lg border-[1px] py-2 border-gray-200 text-xs sm:text-sm md:text-base px-2 hover:bg-gray-200 transition"
          >{`Price: Low to High`}</span>
          <span
            onClick={() => sortProducts("rating")}
            className="w-full bg-white rounded-lg border-[1px] py-2 border-gray-200 text-xs sm:text-sm md:text-base px-2 hover:bg-gray-200 transition"
          >{`Rating`}</span>
        </span>
      )}
    </p>
  );
};

export default SortFilter;
