import React from "react";
import { BiSolidPhoneCall } from "react-icons/bi";
import { onOpen as openContactForm } from "../store/contactFormSlice";
import { useDispatch } from "react-redux";
import { CiDeliveryTruck} from "react-icons/ci"

const BulkOrder = () => {

    const dispatch = useDispatch();

  return (
    <div onClick={() => {dispatch(openContactForm())}} className="fixed h-fit overflow-hidden bottom-[20%] left-0 flex flex-col gap-1 items-center p-2 bg-[#ff6536] text-white shadow-lg cursor-pointer">
      <span className="text-xs text-white">Bulk </span>
      <CiDeliveryTruck size={30} className="text-white" />
      <span className="text-xs text-white">Order</span>
    </div>
  );
};

export default BulkOrder;