import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import WishlistButton from "./WishlistButton";
// import product1 from "@/public/assets/p1.png";
// import product2 from "@/public/assets/p2.png";
// import product3 from "@/public/assets/p3.png";
// import product4 from "@/public/assets/p4.png";
// import product5 from "@/public/assets/p5.png";
// import product6 from "@/public/assets/p6.png";
// import product7 from "@/public/assets/p7.png";

const ProductDetailsCarousel = ({ images, id, isNew }) => {
  // const productData = [
  //   {
  //     imageSrc: product1,
  //   },
  //   {
  //     imageSrc: product2,
  //   },
  //   {
  //     imageSrc: product3,
  //   },
  //   {
  //     imageSrc: product4,
  //   },
  //   {
  //     imageSrc: product5,
  //   },
  //   {
  //     imageSrc: product6,
  //   },
  //   {
  //     imageSrc: product7,
  //   },
  // ];

  return (
    <div className="text-white self-start text-[20px] w-full max-w-[1360px] mx-auto block">
      <Carousel
        infiniteLoop={true}
        showIndicators={false}
        showStatus={false}
        thumbWidth={100}
        className="productCarousel"

      >
        {images && images.map((item, index) => (
          <img
            src={
              item.attributes.url.startsWith("/uploads") ?
                `https://tak.haroth.com${item.attributes.url}` : item.attributes.url} alt={item.attributes.name} key={index} width={1000} height={800} />
        ))}
      </Carousel>
      <WishlistButton isLarge={true} productId={id} />
      {
        isNew && (
          <div className="absolute  px-2 bg-sky-400 text-white top-0 left-6 lg:left-[125px]">


            <span className="text-xs sm:text-sm md:text-lg lg:text-xl py-0">New</span>


          </div>

        )
      }
    </div>
  );
};

export default ProductDetailsCarousel;
