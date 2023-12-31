import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import { fetchDataFromApi } from "../../libs/api";
import Timer from "./Timer";
import MinimalProductCard from "../MinimalProductCard"
import Carousel from "react-multi-carousel";





const FeaturedProducts = () => {

  const [products, setProducts] = useState([]);
  const [coupon, setCoupon] = useState(null)

  useEffect(() => {
    const fetchCouponTimer = async () => {
      try {
        // Fetch the coupon timer data
        const response = await fetchDataFromApi(
          "api/coupons?filters[code]=NEW25&populate=deep"
        );
        if (response.data.length > 0) {
          const couponData = response.data[0];
          // Sort the products by updatedAt in descending order and slice the first 5
          const latest5Products = couponData.attributes.products.data
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
            .slice(0, 5);
          setProducts(latest5Products);
          setCoupon(couponData);
        }
      } catch (error) {
        console.error("Error fetching coupon timer data:", error);
      }
    };

    fetchCouponTimer();
  }, []);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2
    }
  };


  return (
    <div className="min-h-max w-screen sm:mt-20 lg:mt-10 pb-2 md:pb-8 px-6 md:px-16 lg:px-24 max-sm:pt-6 flex flex-col gap-2">
      <div className="w-full flex flex-col md:flex-row gap-0 justify-between">
        <h2 className="min-w-fit text-lg sm:text-xl md:text-2xl md:mb-2 lg:text-3xl font-bold">
          Featured Products
        </h2>
        <Timer countdown={coupon?.attributes?.validity} />
      </div>

      {/* <Carousel>
        {products.map((item , i) => (
            <div key={i} className='min-w-[200px] max-w-[200px] md:min-w-[280px] md:max-w-[280px]'>
              <MinimalProductCard product={item} showPrice={true} /> 
              </div>
          ))}
        </Carousel> */}


        <Carousel responsive={responsive} className="z-[20]">
           {products.map((item , i) => (
            <div key={i} className='min-w-[160px] max-w-[160px] sm:min-w-[190px] sm:max-w-[190px] md:min-w-[200px] md:max-w-[200px] lg:min-w-[250px] lg:max-w-[250px]'>
              <MinimalProductCard product={item} showPrice={true} /> 
              </div>
          ))}
      </Carousel>


    </div>
  );
};

export default FeaturedProducts;
