import React from 'react'
import Container from "../components/Container"
import successAnimation from "../public/success.gif"
import Link from 'next/link'
import Image from 'next/image'
const SucessPage = () => {
  return (
      
      <Container>
      <section className='px-6 md:px-16 lg:px-24 py-10 md:py-40'>

      <div className='flex flex-col items-center gap-2 w-full'>
      <Image
        width={1000}
        height={1000}
        src={successAnimation}
        className='w-[300px] h-auto'
        alt='Success Animation'
       />

       <p className='font-bold tracking-wide text-2xl md:text-3xl'>Order Successful!</p>
       <p className='text-gray-500'>Thank You for Shopping With Us.</p>
       

       <Link href="/" className='bg-[#ff6536] text-white hover:opacity-50 transition border border-black text-center py-2 px-4 text-lg md:text-xl'>Continue Shopping</Link>
      </div>
      
       
      </section>
      </Container>
    )
}

export default SucessPage