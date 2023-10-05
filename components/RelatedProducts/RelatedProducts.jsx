import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import {
  AiFillCaretRight,
  AiFillCaretLeft,
  AiFillLayout,
} from "react-icons/ai";
import ProductCard from "../ProductCard";
import Carousel from "../Carousel";
import MinimalProductCard from "../MinimalProductCard";

const RelatedProducts = ({ relatedProducts }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    }
  }, []);

  if (
    typeof relatedProducts?.data === "undefined" ||
    typeof relatedProducts?.data === "null" ||
    relatedProducts.data.length === 0
  ) {
    return null;
  }

  let products = relatedProducts.data;

  console.log("RELATED PRODUCTS", products);

  return (
    <div className="mt-8 pb-8">
      <Carousel>
        {products.map((product, i) => (
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

export default RelatedProducts;
