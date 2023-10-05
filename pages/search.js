import { useRouter } from "next/router";
import Container from "../components/Container";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { PulseLoader } from "react-spinners";
import { fetchDataFromApi } from "../libs/api";

import MinimalProductCard from "../components/MinimalProductCard"

const SearchPage = () => {
  const router = useRouter();

  const query = router.query;

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [isLoading, setisLoading] = useState(false);


  const changeHandler = async (e) => {
    setisLoading(true);
    setSearch(e.target.value);
    setIsTouched(true);

    const fetchedProducts = await fetchDataFromApi(
      `api/products?filters[Title][$contains]=${e.target.value}&populate=*`
    );
    console.log("fetched products", fetchedProducts);
    setProducts(fetchedProducts.data);
    setisLoading(false);
  };

  return (
    <Container>
      <section className="min-h-screen pt-16 lg:pt-36 items-center flex flex-col ">
        <div className="w-full text-center border-b-[1px] flex items-center justify-center border-gray-300 py-1 px-6 md:px-16 lg:px-24">
          <input
            onChange={changeHandler}
            value={search}
            type="text"
            placeholder="Search for products"
            className="
            w-full
            flex justify-center
            text-center
            items-center
            placeholder:text-xl
            text-xl
            lg:placeholder:text-5xl
            lg:text-5xl
            md:placeholder:text-3xl
            md:text-3xl
          text-gray-800 
          placeholder:text-gray-600
            font-semibold 
            focus:outline-none 
            "
          />
          <AiOutlineClose
            onClick={() => setSearch("")}
            className="cursor-pointer text-gray-700 hover:text-black hover:bg-gray-200 rounded-full px-4 transition duration-200"
            size={60}
          />
        </div>
        <p className="md:text-sm text-xs text-gray-500 text-center py-2 mb-4">
          Start typing to see results.
        </p>

        <div className="h-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-8 px-6 md:px-16 lg:px-24 w-screen">
          {isLoading ? (
            <p className="text-3xl text-center col-span-full mt-16 lg:mt-32 ">
              <PulseLoader color="#ff6836" />
            </p>
          ) : isTouched ? (
            products?.length > 0 ? (
              <>
                {products.map((p, i) => (
                  <MinimalProductCard showPrice={true} product={p} key={i} />
                ))}
              </>
            ) : (
              <p className="text-3xl col-span-full text-center font-bold mt-16 lg:mt-32">
                No data found
              </p>
            )
          ) : null}
        </div>
      </section>
    </Container>
  );
};

export default SearchPage;
