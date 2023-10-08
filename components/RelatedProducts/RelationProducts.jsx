import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  AiFillCaretRight,
  AiFillCaretLeft,
  AiFillLayout,
} from "react-icons/ai";
import ProductCard from "../ProductCard";
import Carousel from "../Carousel";
import MinimalProductCard from "../MinimalProductCard";

const RelationProducts = ({ RelationProducts, referenceProduct }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check screen width and set isMobile accordingly
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check on component mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (
    !RelationProducts?.data ||
    RelationProducts.data.length === 0
  ) {
    return null;
  }

  // Filter out products with the same sub-category as the reference product
  const filteredProducts = RelationProducts.data.filter(
    (product) => product.subCategory !== referenceProduct.subCategory
  );

  return (
    <div className="mt-8 pb-8">
      <Carousel>
        {filteredProducts.map((product, i) => (
          <div className="min-w-[200px] sm:min-w-[280px] max-w-[280px] min-h-fit" key={i}>
            {isMobile ? (
              <MinimalProductCard product={product} />
            ) : (
              <ProductCard product={product} />
            )}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default RelationProducts;
