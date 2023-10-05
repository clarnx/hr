import Head from "next/head";

import React, { useEffect, useMemo, useState } from "react";
import FeaturedProducts from "../components/Homepage/FeaturedProducts";
import { fetchDataFromApi, getUserId } from "../libs/api";
import HeroBanner from "../components/HeroBanner";
import Container from "../components/Container";
import { getSession, useSession } from "next-auth/react";

import MostDemandingFeatures from "../components/Homepage/MostDemandingFeatures";
import LivingRoom from "../components/Homepage/LivingRoom";
import HomeDecor from "../components/Homepage/HomeDecor";
import TopPickedSofas from "../components/Homepage/TopPickedSofas";
import ShopAtJodhpur from "../components/Homepage/ShopAtJodhpur";
import CategoryCarousel from "../components/CategoryCarousel";
import WoodenStore from "../components/Homepage/WoodenStore";
import TopPickedDining from "../components/Homepage/TopPickedDining";
import { HomepageInformation } from "../components/HomepageInformation";

const Home = ({ products, homePageDetails, topPickedSofas, categories }) => {
  let isMobile = false;

  console.log("Categories", categories);

  let information = homePageDetails.data.attributes.pageInformation[0].pageImformation;

  useEffect(() => {
    if (window.innerWidth < 1024) {
      isMobile = true;
    }
  }, []);
  const { data: session } = useSession();

  // console.log("TOP picked Sofas,", topPickedSofas);
  // console.log("Top Picked Dining,", topPickedDining);

  return (
    <>
      <Head>
        <title>
          {homePageDetails && homePageDetails.data.attributes.homePageTitle}
        </title>
        <link
          rel="canonical"
          href="https://haroth/product/${productSlug}"
          key="canonical"
        />
        <meta name="description" content="Online Furniture Store" />
      </Head>
      <Container>
        <main className="pt-10 lg:pt-32 bg-[#ffffff] gap-0">
          {/* {
        openCart && <Cart openCart={openCart} setOpenCart={setOpenCart} />
      } */}

          <CategoryCarousel categories={categories} />

          <HeroBanner homePageDetails={homePageDetails} />

          <FeaturedProducts />

          <MostDemandingFeatures isHome={true} />

          <LivingRoom />
          
          {/* <topPickedSofas />           */}

          <TopPickedDining />

          <ShopAtJodhpur />

          <WoodenStore />
          <HomeDecor />

          <HomepageInformation />

          {/* <p className="mt-8 px-6 md:px-16 lg:px-24 hidden md:block">
            {information}
          </p> */}

        </main>
      </Container>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const homePageDetails = await fetchDataFromApi("api/homePage?populate=*");
  const categories = await fetchDataFromApi("api/categories?populate=*");

  if (homePageDetails?.data) {
    return {
      props: { 
        homePageDetails,
        categories
      },
    };
  } else {
    return {
      props: {
        homePageDetails: null,
        categories
      },
    };
  }
}
