import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import { BiArrowBack } from "react-icons/bi";
import { AiFillCaretLeft, AiFillCaretRight, AiOutlineRight } from "react-icons/ai";

const HeroBanner = ({ homePageDetails }) => {
  const [saleOfferImages, setSaleOfferImages] = useState([]); // Ensure useState is imported

  useEffect(() => {
    // Fetch saleOffer data from your Strapi API endpoint
    fetch("http://tak.haroth.com/api/homepage?populate=*")
      .then((response) => response.json())
      .then((data) => {
        const saleOfferImage = data.saleOffer.attributes.formats.medium.url; // Use the URL of the 'medium' format
        setSaleOfferImages([saleOfferImage]);
      })
      .catch((error) => {
        console.error("Error fetching saleOffer data:", error);
      });
  }, []);

  return (
    <div className="w-screen px-6 md:px-16 lg:px-24 mb-8">
      <div className="w-full relative">
        {saleOfferImages.length > 0 && (
          <Image
            className="w-full aspect-auto mt-3"
            src={saleOfferImages[0]} // Use the first sale offer image URL
            height={1000}
            width={2000}
            alt="Sale Offer Image"
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
            {saleOfferImages.length > 0 ? (
              saleOfferImages.map((imageURL, i) => (
                <div key={i}>
                  <Image
                    className="w-full aspect-auto"
                    src={imageURL}
                    height={1000}
                    width={2000}
                    alt={`Sale Offer Image ${i + 1}`}
                  />
                </div>
              ))
            ) : (
              <p>Loading saleOffer image...</p>
            )}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
