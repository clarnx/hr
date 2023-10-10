import Container from "../../components/Container";
import React, { useEffect, useState } from "react";
import ProductDetailsCarousel from "../../components/ProductDetailsCarousel";
import { fetchDataFromApi } from "../../libs/api";
import {
  getDiscountPrice,
  getDiscountedPricePercentage,
  getEstimatedDelivery,
} from "../../libs/helper";
import { onOpen as openContactForm } from "../../store/contactFormSlice";
import { addToCart } from "../../store/cartSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import Rating from "../../components/Rating";
import hAssuredTag from "../../public/hAssuredCroped.png";
import Image from "next/image";
import { set, useForm } from "react-hook-form";
import Head from "next/head";
import Breadcrumb from "../../components/Breadcrumb";
import Countdown from "../../components/Countdown";
import ProductDetails from "../../components/ProductDetails";
import PincodeChecker from "../../components/PincodeChecker";
import RelatedProducts from "../../components/RelatedProducts/RelatedProducts";
import Link from "next/link";
import ProductColors from "../../components/ProductColors";
import ProductSaleOffer from "../../components/ProductSaleOffer";

const ProductPage = ({ product, relatedProducts, giftCoupon }) => {
  // console.log("PRODUCT --> ", product);
  const p = product?.data?.[0]?.attributes;
  const coupons = p?.coupons?.data;

  // console.log("GIFT COUOPN", giftCoupon);

  const updateCartItem = (e, key) => {
    let payload = {
      key,
      val: key === "quantity" ? parseInt(e.target.value) : e.target.value,
      id: data.id,
    };
    dispatch(updateCart(payload));
  };

  let discountedPrice = null;

  if (coupons?.length > 0) {
    discountedPrice = getDiscountPrice(
      product.selling_price,
      1,
      coupons[0].percentage,
      coupons[0].discountAmount
    );
  }
  const dispatch = useDispatch();

  // console.log("SELLING PRICE", p.selling_price);

  const router = useRouter();

  const notify = () => {
    toast.success("Success. Check your cart!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };


  
  let breadcrumb = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: `${p.categories.data[0].attributes.categoryname}`,
      href: `/category/${p.categories.data[0].attributes.category_slug.replaceAll(
        "-",
        " "
      )}`,
    },
    {
      name: `${p.sub_categories.data[0].attributes.Title}`,
      href: `/products/${p.sub_categories.data[0].attributes.subcategory_slug}`,
    },
  ];




  return (
    <Container>
      <div className=" bg-white">
      <Head>
        <title>{p.Title}</title>
        <meta name="description" content={p.description} />
      </Head>
      <div className="lg:pt-[145px] pt-16 px-6 md:px-16 lg:px-24">
        <Breadcrumb breadcrumb={breadcrumb} />
        <div className="flex relative flex-col h-fit lg:flex-row  gap-[20px] lg:gap-[25px] ">
          {/* left column start */}





          <div className="w-full self-start place-self-start start-0 sticky top-0  flex-[1.5]  lg:max-w-full mx-auto lg:mx-0" >
            <ProductDetailsCarousel
              images={p?.images?.data}
              id={product.data[0].id}
              isNew={p?.isNew}
            />
        

          </div>


          {/* left column end */}

          {/* right column start */}
          <div className="flex-[1]">
            {/* PRODUCT TITLE */}
            <div className="flex flex-col gap-1 text-lg font-semibold mb-2 leading-tight">
              {p.Title}
              <span className="text-[#ff6536] text-sm">
                By {p.brands.data[0].attributes.name.toUpperCase()}
              </span>
            </div>
            {/* PRODUCT RATING */}
            <div className="text-lg font-bold mb-2 flex items-center gap-2 ">
              <Rating rating={p.ratings} />
              <span className="text-gray-500 text-sm sm:text-base">
                {" "}
                {`(${p.reviews.data.length})`}
              </span>
              {p.tags == "h-Assured" && (
                <Image
                  className="w-20 h-auto "
                  src={hAssuredTag}
                  width={100}
                  height={50}
                  alt="h-Assured"
                />
              )}
            </div>
            {/* PRODUCT PRICE */}
            <div className="flex flex-wrap items-center">
              <p className="mr-2 flex gap-2 text-xl font-bold">
                Rs &#8377;{p.todaysDeal || p.selling_price}
                <span className="text-base self-end text-gray-500  font-medium line-through">
                  &#8377;{p.original_price}
                </span>
              </p>
              {p.original_price && (
                <>
                  <p className="ml-0 self-end text-base font-semibold text-green-500">
                    {Math.round(
                      getDiscountedPricePercentage(
                        p.original_price,
                        p.todaysDeal || p.selling_price
                      )
                    )}
                    % off
                  </p>
                </>
              )}
            </div>
            <div className="text-xs font-medium text-black/[0.5] border-b-[1px] border-b-gray-400 mb-2">
              {`(incl. of taxes)`}
            </div>
            {coupons.length > 0 ? (
              <Countdown
                countdown={coupons[0].attributes.validity}
                coupon={coupons[0].attributes}
                productPrice={p.selling_price}
              />
            ) : (
              <Countdown
                coupon={giftCoupon.attributes}
                countdown={giftCoupon.attributes.validity}
                productPrice={p.selling_price}
              />
            )}
            {/* PRODUCT PRICE END */}
            <Image
              src="https://nextjspics.s3.ap-south-1.amazonaws.com/Product_Offer_2_4_1add4f54e4.webp"
              width={500}
              height={200}
              alt="Offer"
              className="w-full h-auto my-4"
            />
            {/* Pincode Availability Checker START */}
            <div className="w-full border-y-2 border-dashed border-y-gray-400 py-2 my-4 mb-4">
              <p className="text-lg font-semibold">Delivery & Assembly</p>
              <p className="text-gray-500 text-sm my-2">
                Check Availability in your area
              </p>
              <PincodeChecker
                brandPincode={p.brands.data[0].attributes.pinCode}
              />
            </div>
            {/* Pincode Availability Checker END */}
            {/* PRODUCT COLOR OPTIONS START */}
            {p.product.data.length > 0 && (
              <div className="w-full mb-2">
                <ProductColors products={p.product.data} slug={p.slug} />
              </div>
            )}
            {/* PRODUCT COLOR OPTIONS END */}
            {/* Quantitiy Selector Start */}
            <div className="flex mb-4">
              <div className="font-semibold">Quantity:</div>
              <select
                className="hover:text-black"
                onChange={(e) => updateCartItem(e, "quantity")}
                defaultValue="1"
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map((q, i) => {
                  return (
                    <option
                      key={i}
                      value={q}
                    // selected={p.quantity === q}
                    >
                      {q}
                    </option>
                  );
                })}
              </select>
            </div>
            {/* Quantitiy Selector End */}
            {/* ADD TO CART BUTTON START */}
            <div className="grid grid-cols-2 gap-4 place-items-center place-content-center mb-10">
              <button
                className="w-full py-4 bg-white text-black text-lg font-medium transition-all active:scale-95 hover:bg-[#ff6536] hover:text-white border-[1px] border-[#ff6536]"
                onClick={() => {
                  dispatch(
                    addToCart({
                      ...product?.data?.[0],
                      couponDiscount: 0,
                      oneQuantityPrice: p.selling_price,
                    })
                  );
                  notify();
                }}
              >
                Add to Cart
              </button>
              
              {/* ADD TO CART BUTTON END */}

              {/* BUYNOW BUTTON START */}
              <button
                onClick={() => {
                  dispatch(
                    addToCart({
                      ...product?.data?.[0],
                      couponDiscount: 0,
                      oneQuantityPrice: p.selling_price,
                    })
                  );
                  notify();

                  router.push("/cart");
                }}
                className="w-full py-4 border bg-[#ff6536] text-white text-lg font-medium transition-all active:scale-95 flex items-center justify-center gap-2
              hover:bg-[#ff6536] hover:text-white duration-200
              "
              >
                Buy Now
              </button>
              {/* BUYNOW BUTTON END */}
            </div>
            {/* Product Details START */}{" "}
            <div className="my-0 py-0 mb-4">
              <ProductSaleOffer />
              <ProductDetails
                brand={p.brands.data[0].attributes.name}
                warranty={p.warranty}
                description={p.productDescription}
                material={p.Primary_Material}
                assemby={p.assemblytype}
                reviews={p.reviews.data}
                brandDescription={p.brands.data[0].attributes?.description_brand}
                size={p.size}
                armType={p?.armType}
                weight={p?.weight}
                SKU_ID={p?.SKU_ID}
                productId={product?.data?.[0]?.id}
              />
            </div>
            {/* Product Details END */}
          </div>
          {/* right column end */}
        </div>
      </div>
      {/* CONTACT US START */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-6 bg-gray-200 text-black border-[1px] border-gray-200 text-base sm:text-lg md:text-xl text-center py-4 px-6 md:px-16">
        <p className="text-sm sm:text-base">
          Talk to Experts :{" "}
          <span className="border-[1px] border-gray-300 px-4 py-2 cursor-pointer hover:shadow-lg transition duration-200 bg-white">
            Call Us {`@ : 91-9868489009`}
          </span>{" "}
        </p>
        <Link
          href="https://blog.haroth.com"
          target="_blank"
          className="text-sm sm:text-base border-[1px] border-gray-300 px-4 py-2 cursor-pointer hover:shadow-lg transition duration-200 max-sm:mr-auto bg-white"
        >
          Check Out Our Blogs
        </Link>
      </div>
      {/* CONTACT US END */}

      {/* RELATED PRODUCTS START */}
      <div className="w-screen px-6 md:px-16 lg:px-24 mt-4">
        <p className="text-lg sm:text-xl md:text-2xl flex items-center relative gap-2">
          <span className=" text-center">
            RELATED &nbsp;
            <span className="text-[#ff6536]">PRODUCTS</span>
          </span>
          <span className="flex-[1] bg-gray-300 h-[1px]"></span>
        </p>
        <RelatedProducts
          relatedProducts={relatedProducts}
          category={p.sub_categories.data[0].attributes.subcategory_slug}
        />
      </div>
      {/* RELATED PRODUCTS END */}

      {/* Callback Button Start */}
      <div className="w-full flex items-center justify-center gap-2 sm:gap-4 md:gap-6 bg-gray-200 text-black border-[1px] border-gray-200 text-base sm:text-lg md:text-xl text-center py-4">
        <p>
          Need Assistance?{" "}
          <span
            onClick={() => dispatch(openContactForm())}
            className="bg-[#ff6536] ml-2 text-white border-[1px] border-gray-200 px-4 py-2 rounded-md cursor-pointer hover:shadow-lg transition duration-200"
          >
            Request a Callback
          </span>{" "}
        </p>
      </div>
      {/* Callback Button End */}

      {/* RELATED PRODUCTS START */}
      <div className="w-screen px-6 md:px-16 lg:px-24 mt-4">
        <p className="text-lg sm:text-xl md:text-2xl flex items-center relative gap-2">
          <span className=" text-center">
            SEE MORE{" "}
            <span className="text-[#ff6536]">
              {p.sub_categories.data[0].attributes.subcategory_slug
                .toUpperCase()
                .replaceAll("-", " ")}
            </span>
          </span>
          <span className="flex-[1] bg-gray-300 h-[1px]"></span>
        </p>
        <RelatedProducts relatedProducts={relatedProducts} />
      </div>
      {/* RELATED PRODUCTS END */}
      </div>
    </Container>
  );
};

export default ProductPage;

export async function getStaticPaths() {
  const products = await fetchDataFromApi("api/products?populate=*&pagination[pageSize]=9999");
  const paths = products.data?.map((p) => ({
    params: {
      slug: p.attributes.slug,
    },
  }));

  // console.log("GET STATIC PAths on Product page");

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  

  const product = await fetchDataFromApi(
    `api/products?populate=deep&filters[slug][$eq]=${slug}`
  );

  const relatedProducts = await fetchDataFromApi(
    `api/products?filters[sub_categories][subcategory_slug][$eq]=${product?.data[0]?.attributes?.sub_categories?.data[0]?.attributes?.subcategory_slug}&populate=*`
  );

  let giftCoupon = await fetchDataFromApi(
    `api/coupons?filters[code]=GIFT&populate=*`
  );

  // Define the revalidation time in seconds (3600 seconds = 1 hour)
  const revalidateInSeconds = 3600;

  // console.log("GSPROP on PRODUCT PAGE")

  return {
    props: {
      product,
      relatedProducts,
      giftCoupon: giftCoupon?.data[0],
    },
    // Set the revalidate option for revalidation every hour
    revalidate: revalidateInSeconds,
  };
}