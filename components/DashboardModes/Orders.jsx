import Image from "next/image";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import React, { useEffect } from "react";
import {BiSupport} from "react-icons/bi"

const Orders = ({ userData }) => {
  console.log("ORDER DATA", userData);

  let orders = userData.orders;


  const getOrderDate = (date) => {
    let orderDate = new Date(date);

    orderDate = orderDate.toDateString();

    return orderDate;
  }

  const router= useRouter();


  // Function to handle canceling an order
  const handleCancelOrder = (orderId) => {
    // Implement the logic to cancel the order here
    // This could involve making an API request to update the order status in your database.
    // You can also show a confirmation dialog before canceling the order.
    console.log(`Cancelled order with ID ${orderId}`);
  };

  // Function to handle returning an order
  const handleReturnOrder = (orderId) => {
    // Implement the logic to initiate a return for the order here
    // This could involve making an API request to update the order status and create a return request.
    // You can also show a confirmation dialog before initiating the return.
    console.log(`Initiated return for order with ID ${orderId}`);
  };

  return (
    <div className="flex flex-col gap-4 py-4">
      <h3 className="text-2xl font-bold text-left">Orders History</h3>
      {orders?.length > 0 ? (
        <div className=" w-full flex flex-col justify-between items-center gap-4 rounded-lg overflow-x-auto">
          {orders.map((item, i) => (
            <div
              key={i}
              className="w-full flex flex-col md:flex-row shadow-md border-2 border-gray-200 py-4 bg-white rounded-lg gap-4 px-4 mb-2"
            >
              <div className="flex items-baseline gap-4 item-start flex-[0.6] mb-2 md:mb-0">
                {i + 1}
                <div className="flex md:flex-col gap-2 capitalize">
                  <span className={`text-sm`}
                  >Status : <span className={
                `${item.order_status === "created" && "bg-blue-200 text-blue-800"}
                 ${item.order_status === "delivered" && "bg-green-200 text-green-700"}
                 ${item.order_status === "shipped" && "bg-yellow-500 text-black"}
                 font-bold rounded-md p-1
                 `}
                 >{item.order_status}</span></span>
                  <span className="text-sm text-left">Order Id : {item.id}</span>
                </div>
              </div>
              <div className="flex-[3] w-full flex flex-col gap-2">
                {item.products.map((p, i) => (
                  <div key={i} className="w-full flex flex-[1] gap-2">
                    <Image
                      src={
                        p.attributes.imageMain.data.attributes.url.startsWith("/uploads") ?
                          `https://tak.haroth.com/${p.attributes.imageMain.data.attributes.url}` :
                          p.attributes.imageMain.data.attributes.url.replace("nextjspics.s3.ap-south-1.amazonaws.com", "img.haroth.com")
                      }
                      width={80}
                      height={80}
                      alt="product Image"
                      className="rounded-md"
                    />
                    <p className="flex flex-col ">
                      <span className="text-left">{p.attributes.Title}</span>
                      <span className="text-xs text-gray-500 text-left">
                        Quantity: {p.quantity}
                      </span>
                      <span className="text-xs text-gray-500 text-left">Price : ₹{p.oneQuantityPrice}</span>
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex flex-[1] flex-col items-start gap-2 text-sm text-black mt-2 md:mt-0">
                <span>Transaction id : {item.transaction_id}</span>
                <span>Amount : ₹{item.amount}</span>
                <span>Ordered At : {getOrderDate(item.createdAt)}</span>


                 {/* Cancel Button */}
                 {item.order_status === "created" && (
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded-md"
                    onClick={() => handleCancelOrder(item.id)}
                  >
                    Cancel Order
                  </button>
                )}

                {/* Return Button */}
                {item.order_status === "delivered" && (
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded-md"
                    onClick={() => handleReturnOrder(item.id)}
                  >
                    Return
                  </button>
                )}

                {/* shipped Track Button */}
                {item.order_status === "shipped" && (
                 <button
                   className="bg-blue-500 text-white px-2 py-1 rounded-md"
                   onClick={() => router.push("/track-order")} 
                 >
                   Track Order
                 </button>
                )}

                {/* help me Button */}
                <BiSupport size={20}></BiSupport>
               

              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p className="text-3xl py-16 text-[#ff6536]">
            You don&apos;t have any Orders yet!
          </p>
        </div>
      )}
    </div>
  );
};

export default Orders;
