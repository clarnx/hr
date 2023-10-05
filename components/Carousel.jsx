import React, { useEffect, useRef } from 'react'
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';

const Carousel = ({ children, showPointers=true }) => {


    const container = useRef();

    // useEffect(() => {
    //   const swiper = new Swiper('.swiper', {
    //     // configure Swiper to use modules
    //     modules: [Navigation, Pagination],
    //   });
    // }, [])
  
    const prevSlide = () => {
      let width = container.current.clientWidth;
  
      container.current.scrollLeft = container.current.scrollLeft - width;
    };
  
    const nextSlide = () => {
      let width = container.current.clientWidth;
  
      container.current.scrollLeft = container.current.scrollLeft + width;
    };
  
    return (
      <div className="min-w-full relative mt-4 overflow-x-hidden">
        {showPointers && (
          <button
          key="prev-btn"
          onClick={prevSlide}
          className="absolute top-1/2 left-0 sm:left-2 z-10 text-white p-2 rounded-full drop-shadow-lg neumorphic-card"
        >
          <AiFillCaretLeft size={30} />
        </button>
        )}

        {showPointers && (
          <button
          key="next-btn"
          onClick={nextSlide}
          className="absolute top-1/2 right-0 sm:right-2 z-10 text-white p-2 rounded-full drop-shadow-lg neumorphic-card"
        >
          <AiFillCaretRight size={30} />
        </button>
        )}
        
        <div key="products-container" className="products-container w-full flex flex-row justify-start md:justify-normal gap-6 overflow-x-auto scroll-smooth touch-pan-x min-h-min" ref={container}>
          {/* <div className="card">1</div>
          <div className="card">2</div>
          <div className="card">3</div>
          <div className="card">4</div>
          <div className="card">5</div>
          <div className="card">6</div>
          <div className="card">7</div>
          <div className="card">8</div> */}
  
          {children}
        </div>
      </div>
    );
  };

export default Carousel