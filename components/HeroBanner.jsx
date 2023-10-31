import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import { BiArrowBack } from "react-icons/bi";
import { AiFillCaretLeft, AiFillCaretRight, AiOutlineRight } from "react-icons/ai";
const HeroBanner = ({ homePageDetails }) => {
  let details = homePageDetails?.data;
  let bannerImage = details.attributes.bannerImage?.data?.attributes;

  // console.log("Details", details);

  let carouselText = [
    " Flat 10% Off on Every HDFC Bank Cards", 
    "Flat 10% Off on Every SBI Bank Cards", 
    "Flat 10% Off on Every PNB Bank Cards"];

  return (
    <div className="w-screen px-6 md:px-16 lg:px-24 mb-8 ">
      <div className="w-full relative">
        {details && (
          <Image
            className="w-full aspect-auto mt-3"
            src={'/durgapuja.webp'}
            height={1000}
            width={2000}
            alt={bannerImage?.alternativeText || "Banner Image"}
          />
        )}
        

        <div className="absolute left-0 max-lg:top-full lg:bottom-[1/3] bg-[#f8f9fa] text-black w-full lg:max-w-fit text-center">
          <Carousel
            showArrows={false}
            showIndicators={false}
            showStatus={false}
            showThumbs={false}
            autoPlay={true}
            interval={2000}
            infiniteLoop={true}
            className="text-center"
          >
            {
              carouselText.map((item, i ) => (
                <p key={i} className="text-base md:text-md lg:text-xl w-full lg:w-fit py-2 md:py-1 lg:py-0 text-center mx-auto font-sans tracking-wider"
                >{item}</p>
              ))
            }
          </Carousel>
        </div>
      </div>
       
    </div> 
  );
};

export default HeroBanner;
