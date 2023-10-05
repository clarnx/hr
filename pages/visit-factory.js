import React from 'react';
import Container from "../components/Container";
import Head from 'next/head';
import { useDispatch } from 'react-redux';
import { onOpen as openVisitFactoryForm } from '../store/visitFactorySlice';




const VisitFactoryPage = () => {

const dispatch = useDispatch();

  return (
    <Container>
    <Head>
    <title>Visity Factory - Haroth.com</title>
    <meta name='description' content='Visit our factory in your city.' />
    </Head>
    {/* <section className='px-6 md:px-16 lg:px-24 pt-16 lg:pt-36 min-h-screen text-3xl text-center mt-5 font-mono underline underline-offset-2'>
       <h1>Our Furniture factory welcomes you</h1>
    </section> */}

    <section class="text-gray-600 body-font">
  <div class="container py-24 mx-auto">
    <div class="flex flex-col text-center w-full mb-5">
      <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900 lg:pt-16">Our Furniture factory welcomes you</h1>
      <p class="lg:w-2/3 mx-auto leading-relaxed text-base">Haroth by TAK Decor is an omnichannel furniture and decor retailer based out of Delhi, India. Haroth by TAK Decor currently has 2 stores in Delhi-NCR and distribution across 75+ cities in India through its website.</p>
    </div>

    <div onClick={() => {dispatch(openVisitFactoryForm())}} className=' text-center mb-5 cursor-pointer'>
    <span className="underline text-red-700 text-lg font-semibold">Fill form for Visit our factory</span>
   </div>

    {/* <div class="container mx-auto px-5 py-2 lg:px-32"> */}
  <div class="-m-1 flex flex-wrap md:-m-2">
    <div class="flex w-1/3 flex-wrap">
      <div class="w-full p-1 md:p-2">
        <img
          alt="gallery"
          class="block h-full w-full rounded-lg object-cover object-center"
          src="https://nextjspics.s3.ap-south-1.amazonaws.com/factory_3_befcbd8135.avif" />
      </div>
    </div>
    <div class="flex w-1/3 flex-wrap">
      <div class="w-full p-1 md:p-2">
        <img
          alt="gallery"
          class="block h-full w-full rounded-lg object-cover object-center"
          src="https://nextjspics.s3.ap-south-1.amazonaws.com/factory_4_5049fdc257.avif" />
      </div>
    </div>
    <div class="flex w-1/3 flex-wrap">
      <div class="w-full p-1 md:p-2">
        <img
          alt="gallery"
          class="block h-full w-full rounded-lg object-cover object-center"
          src="https://nextjspics.s3.ap-south-1.amazonaws.com/factory_7_061c915ed9.webp" />
      </div>
    </div>
    <div class="flex w-1/3 flex-wrap">
      <div class="w-full p-1 md:p-2">
        <img
          alt="gallery"
          class="block h-full w-full rounded-lg object-cover object-center"
          src="https://nextjspics.s3.ap-south-1.amazonaws.com/factory_6_5b2f64d9e3.webp" />
      </div>
    </div>
    <div class="flex w-1/3 flex-wrap">
      <div class="w-full p-1 md:p-2">
        <img
          alt="gallery"
          class="block h-full w-full rounded-lg object-cover object-center"
          src="https://nextjspics.s3.ap-south-1.amazonaws.com/factory_8_c04c493fc8.webp" />
      </div>
    </div>
    <div class="flex w-1/3 flex-wrap">
      <div class="w-full p-1 md:p-2">
        <img
          alt="gallery"
          class="block h-full w-full rounded-lg object-cover object-center"
          src="https://nextjspics.s3.ap-south-1.amazonaws.com/factory_5_935c6a7c56.webp" />
      </div>
    </div>
  </div>
</div>
  {/* </div> */}
</section>

    </Container>
  )
}

export default VisitFactoryPage