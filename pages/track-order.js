import React, { useState } from 'react'
import Container from "../components/Container";
import { useForm } from 'react-hook-form';
import Loading from "../components/Loading"
import { SHIPROCKET_TOKEN } from '../libs/urls';
import { toast } from 'react-hot-toast';

const TrackOrderPage = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [trackMode, setTrackMode] = useState("orderId");
    const [trackingDetails, setTrackingDetails] = useState(false);


    const {
        handleSubmit,
        formState: { errors },
        register,
        setValue,
        getValues,
        setError
    } = useForm();

    const getDate = (dateString) => {
        let date = new Date(dateString);

        return date.toDateString();
    }

    const onSubmit = async (data) => {

        try {
            setIsLoading(true)

            let res = await fetch(`https://apiv2.shiprocket.in/v1/external/courier/track/awb/${data.awb}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${SHIPROCKET_TOKEN}`
                }
            })

            res = await res.json();

            if(!res[0] || res?.length == 0) {
                console.log("This was run")
                setError("awb", { 
                    type: "custom",
                    message: "Invalid AWB No."
                })

                setIsLoading(false);
                toast.error("Invalid AWB No.");
                return;
            }

            if(res?.status_code == "401") {
                toast.error("TOKEN EXPIRED");
                setIsLoading(false);
                return;
            }

                setTrackingDetails(res?.tracking_data.shipment_track_activities);
       


        } catch (error) {
            console.log(error);
            toast.error("Error Tracking Order");
        } finally {
            setIsLoading(false)
        }

    }

    return (
        <Container>

            <section className='px-6 md:px-16 lg:px-24 md:pt-36 min-h-screen w-screen text-center'>
                <form onSubmit={handleSubmit(onSubmit)} className='bg-white flex flex-col items-center mx-auto py-4 px-4 w-[85%] md:w-[65%] lg:w-1/2 mt-8'>
                    <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold  mb-8'>Track Your Order</h1>

                    {/* <div className='flex gap-4 items-center'>
                        <span>Track By: </span>
                        <div class="flex items-center">
                            <input onChange={(e) => setTrackMode(e.target.value)} checked={trackMode == "orderId"}  id="default-radio-1" type="radio" value="orderId" name="trackMode" class="w-4 h-4 text-[#ff6536] bg-gray-100 border-gray-300 focus:ring-[#ff6536] dark:focus:ring-[#ff6536] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label for="default-radio-1" class="ml-2 text-sm font-medium text-gray-900">Order Id</label>
                        </div>
                        <div class="flex items-center">
                            <input onChange={(e) => setTrackMode(e.target.value)} checked={trackMode == "awb"} id="default-radio-2" type="radio" value="awb" name="trackMode" class="w-4 h-4 text-[#ff6536] bg-gray-100 border-gray-300 focus:ring-[#ff6536] dark:focus:ring-[#ff6536] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label for="default-radio-2" class="ml-2 text-sm font-medium text-gray-900">AWB No.</label>
                        </div>
                    </div> */}




                    {/* {trackMode == "awb" ? 
                        <div className='flex flex-col gap-1 w-fit items-left text-left mt-4'>
                        <label htmlFor='orderId' className='text-left text-sm md:text-base text-gray-500w'>Awb No. <span className='text-red-500 ml-2'> {errors.orderId && (
                            errors.orderId.type == "required" ? "Order Id is Required" : errors.orderId?.message
                        )}</span> </label>
                        <div className='flex flex-col gap-2 md:flex-row'>
                            <input className='border border-gray-200 px-2 py-1' type='text' placeholder='Awb No.' {...register("awb", {
                                required: true
                            })} />
                            <input id='orderId' type='submit' value="Track Order" className='bg-[#ff6536] cursor-pointer text-white py-2 px-4 hover:opacity-50 disabled:cursor-not-allowed ' />
                        </div>
                    </div> */}


                    <div className='flex flex-col gap-1 w-fit items-left text-left mt-4'>
                        <label htmlFor='orderId' className='text-left text-sm md:text-base text-gray-500w'>Awb No.  <span className='text-red-500 ml-2'> {errors.awb && (
                            errors.awb.type == "required" ? "AWB No. is Required" : errors.awb.message
                        )}</span> </label>
                        <div className='flex flex-col gap-2 md:flex-row'>
                            <input type="number" className='border border-gray-200 px-2 py-1' placeholder='AWB No.' {...register("awb", {
                                required: true
                            })} />
                            <input id='orderId' type='submit' value="Track Order" className='bg-[#ff6536] cursor-pointer text-white py-2 px-4 hover:opacity-50 disabled:cursor-not-allowed ' />
                        </div>
                    </div>

                </form>
                {
                    trackingDetails && (
                        <div className='flex flex-col mx-auto mt-4 gap-2 w-[85%] md:w-[65%] lg:w-1/2'>
                            {trackingDetails.map((item, i) => (
                                <div key={i} className='bg-white border border-gray-200 shadow-md py-2 px-4 flex flex-col gap-2'>
                                <span className='text-gray-800 text-left text-sm text-bold'>{getDate(item.date)}</span>
                                <div className='flex items-center gap-2'>
                                 {i == 0  && <span className='bg-[#ff6536] w-[10px] h-[10px] rounded-full'></span>}
                                    <span className='font-bold'>{item["sr-status-label"]}</span>
                                    
                                    </div>
                                <p className='text-xs text-left md:text-sm text-gray-500'>{item.location}</p>
                                <p className='text-xs text-left md:text-sm text-gray-500'>Activity: {item.activity}</p>
                                </div>
                            ))}

                        </div>
                    )
                }

                <Loading loading={isLoading} key="loading" />
            </section>
        </Container>
    )
}

export default TrackOrderPage