import React from "react";
import { GrClose } from "react-icons/gr";
import {motion} from 'framer-motion'


// const Cart = ({ openCart, setOpenCart }) => {
//   return (
//     <div className={`absolute z-10 left-0 top-0 w-screen h-screen bg-black/50 ${openCart ? "translate-x-0" : "translate-x-[2500px]"} transition-all duration-300`}
//       onClick={() => setOpenCart(false)}
//     >
//       <div className="absolute right-0 top-0 h-screen w-1/4 bg-white py-4 z-40"
//         onClick={(e) => {e.stopPropagation()}}
//       >
//         <div className="flex items-center justify-between px-6 border-b-[1px] border-b-gray-300 pb-2">
//           <span className="text-lg ">Shopping Cart</span>
//           <span
//             onClick={() => setOpenCart(false)}
//            className="text-gray-600 text-sm cursor-pointer flex items-center font-semibold gap-2 align-center rounded-full hover:bg-gray-200 p-2 transition hover:text-black">
//             <GrClose size={16} /> Close
//           </span>
//         </div>

//         <div className="h-2/3">{/* PRODUCTS CONTAINER */}</div>


//         <div className="border-t-[1px] border-t-gray-300 px-6 py-2 flex justify-between text-lg font-semibold text-black">
//           <span>Subtotal</span>
//           <span className="text-[#ff6536]"> ₹ 6,134</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;

const Cart = ({ openCart, setOpenCart }) => {

    return (
          <div
            // initial={{
            //   width: 0
            // }}
            // animate={{
            //   width: "100vw"
            // }}
            // exit={{
            //   width: 0
            // }}
           className={`fixed z-10 right-0 top-0 h-screen transition-all duration-200 bg-black/50 ${openCart ? "w-screen" : "w-0"}`}
            onClick={() => setOpenCart(false)}
          >
            <div className={`right-0 top-0 h-screen lg:w-1/4 w-2/3 bg-white py-4 z-40 ${openCart ? "absolute" : "hidden"}`}
              onClick={(e) => {e.stopPropagation()}}
            >
              <div className="flex items-center justify-between px-6 border-b-[1px] border-b-gray-300 pb-2">
                <span className="text-lg ">Shopping Cart</span>
                <span
                  onClick={() => setOpenCart(false)}
                 className="text-gray-600 text-sm cursor-pointer flex items-center font-semibold gap-2 align-center rounded-full hover:bg-gray-200 p-2 transition hover:text-black">
                  <GrClose size={16} /> Close
                </span>
              </div>
      
              <div className="h-2/3">{/* PRODUCTS CONTAINER */}</div>
      
      
              <div className="border-t-[1px] border-t-gray-300 px-6 py-2 flex justify-between text-lg font-semibold text-black">
                <span>Subtotal</span>
                <span className="text-[#ff6536]"> ₹ 6,134</span>
              </div>
            </div>
          </div>
        );
  
}

export default Cart
