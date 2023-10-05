import React from 'react'
import Container from '../components/Container'
import Link from 'next/link'
import Image from 'next/image'

const Error404Page = () => {
  return (
    <Container>
      
    <div className='pt-16 lg:pt-32 px-6 md:px-16 lg:px-32 min-h-[80vh] flex flex-col justify-center items-center gap-4'>
      <Image
         src={"/coming_soon_1.webp"}
         width={500}
         height={220}
         alt="decor img"
         className=""
      />
        <p className='text-[#ff6536] text-xl text-center'>Coming Soon!</p>
        <Link href="/" className='mx-auto max-w-fit bg-[#431d12] text-white py-2 px-4 rounded-xl text-xl text-center hover:opacity-60 transition-all duration-200 active:scale-95'>More Categories</Link>
    </div>

    </Container>
  )
}

export default Error404Page