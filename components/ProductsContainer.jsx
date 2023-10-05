import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import FilterModal from "./FilterModal";
import SortFilter from "./SortFilter";
import { BsChevronRight, BsChevronDown } from "react-icons/bs"
import Image from "next/image";
const ProductsContainer = ({ products: receivedProducts }) => {

  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [products, setProducts] = useState([...receivedProducts]);
  const [ColorFilter, setColorFilter] = useState(null);
  const [openSortModal, setOpenSortModal] = useState(false);
  const [sortMode, setSortMode] = useState("Relevance");

 
  
  const toggleIsOpen = () => {
    setOpenFilterModal((prev) => !prev);
  };

  const sortProducts = async (sortType) => {
    if (sortType === "price:high-to-low") {
      let sortedProducts = products.sort(
        (p1, p2) => p2.attributes.selling_price - p1.attributes.selling_price
      );
      setProducts(sortedProducts);
      setSortMode("Price: High to Low");
    }
    if (sortType === "price:low-to-high") {
      let sortedProducts = products.sort(
        (p1, p2) => p1.attributes.selling_price - p2.attributes.selling_price
      );
      setProducts(sortedProducts);
      setSortMode("Price: Low to High");
    }
    if (sortType === "rating") {
      let sortedProducts = products.sort(
        (p1, p2) => p2.attributes.ratings - p1.attributes.ratings
      );
      setProducts(sortedProducts);
      setSortMode("Rating");
    }
    if (sortType === "relevance") {
      console.log("camer here")
      setProducts([...receivedProducts]);
      setSortMode("Relevance");
    }
  };
  return (
    <>
      <div className="w-screen flex flex-col py-2 px-6 md:px-16 lg:px-24 items-center   gap-4">
        <div className="flex justify-between w-full">
          <p
            onClick={toggleIsOpen}
            className="cursor-pointer text-base flex gap-2 items-center sm:text-lg font-bold"
          >
            Filters <BsChevronRight />
          </p>
          <p
            onClick={() => {
              setOpenSortModal((prev) => !prev);
            }}
            className="cursor-pointer relative text-sm sm:text-base md:text-lg flex items-center gap-2 font-bold"
          >
            Sort by {sortMode} <BsChevronDown />
            {openSortModal && (
              <span className="absolute rounded-lg top-full right-0 z-[1000] flex flex-col gap-0  bg-transparent shadow-xl min-w-[160px] sm:min-w-[200px] text-center">
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
        </div>
        <div className="min-h-max pb-8  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.length > 0 ? (
            products.map((prod, i) => (
              <>
              <ProductCard key={i} product={prod} />
              {i > 0 && (i+1)%12 == 0 || i==3  && <div className="col-span-full w-full place-self-start">
                <Image
                  src="https://img.haroth.com/decor_homepage_5_612e2f612a.webp"
                  width={2000}
                  height={1000}
                  className="w-1/2 h-auto"
                 />
              </div>}
              </>
            ))
          ) : (
            <>
              <p className="mt-10 text-2xl font-bold col-span-full place-self-center place-content-center">
                No Products Found
              </p>
              <button
                onClick={() => setProducts(receivedProducts)}
                className="col-span-full border-[1px] text-2xl border-black bg-[#ff6536] text-white px-4 py-2 rounded-lg block"
              >
                Reset Filters
              </button>
            </>
          )}
        </div>
      </div>
      <FilterModal
        setProducts={setProducts}
        receivedProducts={receivedProducts}
        isOpen={openFilterModal}
        setIsOpen={setOpenFilterModal}
      />
    </>
  );
};

export default ProductsContainer;
