import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className='w-screen flex flex-row text-center px-6 md:px-16 lg:px-24 justify-between items-center py-2 font-semibold border-y-[1px] border-y-gray-200'>

        <Link href={`/category/furniture`} key={"1"} className='hover:text-[#ff6536] cursor-pointer transition-all duration-250 hover:scale-105 '>Furniture</Link>
        <Link href={`/category/chairs-and-seating`} key={"2"} className='hover:text-[#ff6536] cursor-pointer transition-all duration-250 hover:scale-105 '>Chairs &#38; Seating</Link>
        <Link href={`/category/storage`} key={"3"} className='hover:text-[#ff6536] cursor-pointer transition-all duration-250 hover:scale-105 '>Storage</Link>
        <Link href={`/category/home-decor`} key={"4"} className='hover:text-[#ff6536] cursor-pointer transition-all duration-250 hover:scale-105 '>Home Decor</Link>
        <Link href={`/category/study-and-office`} key={"5"} className='hover:text-[#ff6536] cursor-pointer transition-all duration-250 hover:scale-105 '>Study &#38; Office</Link>
        <Link href={`/category/kitchen-appliances`} key={"6"} className='hover:text-[#ff6536] cursor-pointer transition-all duration-250 hover:scale-105 '>Applicances</Link>
        <Link href={`/category/handicrafts`} key={"7"} className='hover:text-[#ff6536] cursor-pointer transition-all duration-250 hover:scale-105 '>Handicrafts</Link>
        <Link href={`/category/wooden-store`} key={"8"} className='hover:text-[#ff6536] cursor-pointer transition-all duration-250 hover:scale-105 '>Wooden Store</Link>
        <Link href={`/category/lights`} key={"9"} className='hover:text-[#ff6536] cursor-pointer transition-all duration-250 hover:scale-105 '>Lamp &#38; Lights</Link>
        <Link href={`/modular-interior?isModular=false`} key={"10"} className='hover:text-[#ff6536] cursor-pointer transition-all duration-250 hover:scale-105 '>Interior</Link>
        <Link href={`/modular-interior?isModular=true`} key={"11"} className='hover:text-[#ff6536] cursor-pointer transition-all duration-250 hover:scale-105 '>Modular</Link>
       
    </nav>
  )
}

export default Navbar