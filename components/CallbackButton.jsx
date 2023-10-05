import React from "react";
import { BiSolidPhoneCall } from "react-icons/bi";
import { onOpen as openContactForm } from "../store/contactFormSlice";
import { onOpen as openBulkPurchaseForm } from "../store/bulkPurchaseSlice"
import { useDispatch } from "react-redux";
import { CiDeliveryTruck } from "react-icons/ci";
import { useRouter } from "next/router";

const CallbackButton = () => {
  const dispatch = useDispatch();
  const router =useRouter();

  // Define an array of page paths where you want to hide the button
  const pagesToHideButton = ["/cart", "/checkout"];

  // Check if the current route matches any of the pages to hide the button
  const isHidden = pagesToHideButton.includes(router.pathname);

  if (isHidden) {
    return null; // Don't render the button on cart and checkout pages
  }

  return (
    <>
      <div
        
        className="fixed top-1/3 right-0 flex flex-col gap-2 items-center p-1 py-1 bg-[#246193] text-white shadow-lg cursor-pointer z-[10000] rounded-l-md"
      >
        <div className="flex flex-col gap-1"
        
        onClick={() => {
          dispatch(openContactForm());
        }}
        >
          <span className="text-xs text-white mx-2">Need</span>
          <BiSolidPhoneCall size={25} className=" mx-2" />
          <span className="text-xs text-white ">
            Callback
          </span>
        </div>
        <hr className="h-[1px] bg-white w-full text-white" />
        <div className="flex flex-col gap-1" onClick={() => {
          dispatch(openBulkPurchaseForm())
        }}>
          <span className="text-xs text-white">Bulk </span>
          <CiDeliveryTruck size={30} className="text-white" />
          <span className="text-xs text-white">Order</span>
        </div>
      </div>
    </>
  );
};

export default CallbackButton;
