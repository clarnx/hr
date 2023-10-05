import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onClose as closeBulkPurchaseForm } from "../store/bulkPurchaseSlice";
import { useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import { motion } from "framer-motion";
import Loading from "../components/Loading";
import { toast } from "react-hot-toast";
import axios from "axios";
import { IoMdLocate } from "react-icons/io"
import { FiNavigation } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { BulkFormInput } from "../components/BulkPurchaseForm";
import Container from "../components/Container";
import Breadcrumb from "../components/Breadcrumb";
import { fetchDataFromApi } from "../libs/api";
import { useRouter } from "next/router";


const ModularInteriorPage = () => {


    const [isLoading, setisLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [generatedOtp, setGeneratedOtp] = useState("")
    const [otpSent, setOtpSent] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [hasChecked, setHasChecked] = useState(false)
    const [category, setCategory] = useState(null);    

    const router = useRouter();

    let {isModular} = router.query;

    useEffect(() => {

        const { isModular } = router.query;

    
            let res = fetchDataFromApi(`api/categories?populate=*`).then(response => {
                let data;
                if(isModular == "true") {
                   data = response.data.filter(item => item.attributes.category_slug === "modular-kitchen")
                } else {
                   data = response.data.filter(item => item.attributes.category_slug === "interior")
                }

                console.log("DATA", data[0])
                setCategory(data[0]);
            });
        

    }, [router.query])


    const [pincode, setPincode] = useState("")

    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        getValues,
        reset,
        setError,
        formState,
        setValue,
        setFocus
    } = useForm();


    const sendOtp = async () => {
        let mobileno = getValues("mobileno");
        try {
            setError("mobileno", null)

            if (mobileno.length === 0) {
                setError("mobileno", {
                    type: "required",
                    message: "Mobile No. is required"
                })
                return;
            } else if (mobileno.length < 10 || mobileno.length > 10) {
                setError("mobileno", {
                    type: "custom",
                    message: "Mobile No. must be of 10 digits"
                })

                return;
            }


            setOtpSent(false);
            setisLoading(true);

            let {
                data: { otp }
            } = await axios.post("/api/verifyOtp", {
                phone_number: mobileno,
            });

            setGeneratedOtp(otp)

            setOtpSent(true);

        } catch (error) {
            toast.error("ERROR SENDING OTP");
            console.log(error)
        }
        finally {
            setisLoading(false)
        }



    }

    const verifyOtp = async () => {
        setisLoading(true);

        if (!otpSent) {
            setFocus("mobileno");
            setError("enteredOtp", {
                type: "custom",
                message: "Enter Correct Mobile Number"
            });
            setisLoading(false)
            return;
        }

        let enteredOtp = getValues('enteredOtp')

        try {

            setError("enteredOtp", null)
            if (enteredOtp.length === 0) {
                setError("enteredOtp", {
                    type: "required",
                    message: "OTP is required"
                })
                setisLoading(false)
                return;
            } else if (enteredOtp.length < 6 || enteredOtp.length > 6) {
                setError("enteredOtp", {
                    type: "custom",
                    message: "OTP must be of 6 digits"
                })

                setisLoading(false)
                return;
            }

            if (enteredOtp == generatedOtp) {
                setIsVerified(true)
                toast.success("Mobile Number Verified");

            } else {
                setError("enteredOtp", {
                    type: "custom",
                    message: "INVALID OTP"
                })

            }

        } catch (error) {
            console.log(error);
            toast.error("ERROR verifying OTP");
        }
        finally {
            setisLoading(false)
        }
    }

    const getLocation = async (pincode) => {
        try {
            setError("pincode", null)
            if (pincode.length === 0) {
                setError("pincode", {
                    type: "required",
                    message: "Pincode is required"
                })
                return;
            } else if (pincode.length < 6 || pincode.length > 6) {
                setError("pincode", {
                    type: "custom",
                    message: "Pincode must be of 6 digits"
                })

                return;
            }

            setisLoading(true);
            let res = await fetch(`https://apiv2.shiprocket.in/v1/external/open/postcode/details?postcode=${pincode}`, {
                headers: {
                    'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaXYyLnNoaXByb2NrZXQuaW4vdjEvZXh0ZXJuYWwvYXV0aC9sb2dpbiIsImlhdCI6MTY4OTkxMzA0NywiZXhwIjoxNjkwNzc3MDQ3LCJuYmYiOjE2ODk5MTMwNDcsImp0aSI6IlRHZ2hUU1B1RWRvdlVJRW8iLCJzdWIiOjM3NjU2MzEsInBydiI6IjA1YmI2NjBmNjdjYWM3NDVmN2IzZGExZWVmMTk3MTk1YTIxMWU2ZDkifQ.Rf0pnePf0mKLrXbR_-LGkl0pMAOCeTdY6uF-gbaqBvY`
                }
            })

            res = await res.json();

            if (res.success) {
                let { postcode_details: { state, city, locality } } = res;
                setValue("state", state)
                setValue("city", city)
                setValue("locality", locality[0])
            } else {
                setError("pincode", {
                    type: "custom",
                    message: "Invalid Pincode"
                })
            }

            console.log("res", res)
        } catch (error) {
            console.log(error)
            toast.error("Error Fetching Location");
        } finally {
            setisLoading(false)
        }

    }


    const onSubmit = async (data) => {
        try {
            setisLoading(true);
            setErrorMsg("");
            console.log("DATA", data)

            const res = await axios.post("/api/contact", { data, type: "contact" });

            if (res.status == 200) {
                toast.success("Message Sent Successfully!")
            }

        } catch (error) {
            console.log(error);
            if (error?.response?.status === 400) {
                setErrorMsg(error.response.data.message);
            } else {
                toast.error("Error Submitting Form");
            }
        } finally {
            setisLoading(false);
        }




    };

    let breadcrumb = [
        {
            name: "Home",
            href: "/",
        },
        {
            name: `${isModular == "true" ? "Modular" : "Interior"}`,
            href: `/modular-interior`,
        },
    ];

    return (
        <Container>
            <section className="grid grid-cols-1 md:grid-cols-2 min-h-screen w-screen px-6 md:px-16 lg:px-24 pt-16 lg:pt-[150px] mt-0">
                <div className="relative col-span-full max-h-fit">
                    <Breadcrumb breadcrumb={breadcrumb} />

                    <Image
                        src={
                            category?.attributes?.categoryimage?.data?.attributes?.url.startsWith('/uploads') ? (
                                `https://tak.haroth.com${category?.attributes?.categoryimage?.data?.attributes?.url}`
                            ) : category?.attributes?.categoryimage?.data?.attributes?.url.replace(
                    "nextjspics.s3.ap-south-1.amazonaws.com",
                    "img.haroth.com"
                  )
                        }
                        width={2000}
                        height={1000}
                        alt="Category Image"
                        className="w-full aspect-24/5 mb-0 lg:mb-10"
                    />
                </div>
                <div className="col-span-full flex flex-col lg:flex-row w-full h-full md:max-h-[500px] gap-4">

               
          
                    <Image
                        src="/kitchen_page.webp"  // change url here
                        alt="Modular Kitchen"
                        width={400}
                        height={400}
                        className="flex-[1] h-full hidden lg:block"
                    />
            

                <motion.div
                    initial={{
                        y: 200,
                    }}
                    animate={{
                        y: 0,
                    }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative flex-[1] w-full max-h-fit bg-white z-40 flex flex-col gap-6 items-center md:px-14 px-6 md:py-8 py-6 rounded-lg mx-auto"
                >
                    <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-black text-center">Consult With Free Designer
                        <span className="text-gray-400 text-sm block w-full">To get a FREE Quote, Fill this Form</span>
                    </span>
                    {errorMsg && (
                        <span className="text-xl -mt-4 underline underline-offset-4 text-red-500">
                            {errorMsg}
                        </span>
                    )}
                    <form
                        className="grid grid-cols-1 sm:grid-cols-2 w-full gap-6"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <BulkFormInput
                            type="text"
                            label="Name"
                            required={true}
                            id="name"
                            register={register}
                            errors={errors.name}
                        />
                        <BulkFormInput
                            type="email"
                            label="Email"
                            required={false}
                            id="email"
                            register={register}
                            errors={errors.email}
                        />

                        {/* MOBILE NUMBER INPUT START */}
                        <div className="relative w-full h-fit">
                            <input
                                className={`border border-gray-300 rounded-md px-2 py-1 w-full `}
                                type="number"
                                placeholder="Mobile Number"
                                {...register("mobileno", { required: true })}
                            />
                            {errors.mobileno && <p className="absolute -bottom-2/3 text-xs sm:text-sm left-0 text-red-500">
                                {errors.mobileno.type === "required" && "Mobile No. is required"}
                                {errors.mobileno.type === "custom" && errors.mobileno.message}
                            </p>}

                            {
                                otpSent && !isVerified && <p className="absolute -bottom-2/3 text-xs sm:text-sm left-0 text-green-500">
                                    OTP Sent!
                                </p>
                            }

                            <span onClick={async () => { await sendOtp() }} className="absolute right-2 bottom-[16%] text-[#ff6536] flex items-center cursor-pointer">

                                Send OTP
                            </span>
                        </div>
                        {/* MOBILE NUMBER INPUT END */}


                        {/* OTP INPUT START */}

                        <div className="relative w-full h-fit">
                            <input
                                className={`border border-gray-300 rounded-md px-2 py-1 w-full disabled:opaicty-40 disabled:cursor-not-allowed`}
                                type="number"
                                placeholder="OTP"
                                disabled={!otpSent || isVerified}
                                {...register("enteredOtp", { required: true })}
                            />
                            {errors.enteredOtp && <p className="absolute -bottom-2/3 text-xs sm:text-sm left-0 text-red-500">
                                {errors.enteredOtp.type === "required" && "OTP is required"}
                                {errors.enteredOtp.type === "custom" && errors.enteredOtp.message}
                            </p>}

                            {
                                otpSent && isVerified && (
                                    <span className="absolute right-2 bottom-[16%] text-green-500 flex items-center cursor-pointer">
                                        Verified ✅
                                    </span>
                                )
                            }
                            {
                                !isVerified && <span onClick={async () => { await verifyOtp() }} className="absolute right-2 bottom-[16%] text-[#ff6536] flex items-center cursor-pointer">

                                    Verify OTP
                                </span>
                            }

                        </div>
                        {/* OTP INPUT END */}




                        <div className="relative w-full h-fit">
                            <input
                                className={`border border-gray-300 rounded-md px-2 py-1 w-full `}
                                type="number"
                                {...register("pincode", {
                                    required: true
                                })}
                                placeholder="Pincode"
                                onChange={(e) => setPincode(e.target.value)}
                            />
                            {errors.pincode && <p className="absolute -bottom-2/3 text-xs sm:text-sm left-0 text-red-500">
                                {errors.pincode.type === "required" && "Pincode is required"}
                                {errors.pincode.type === "custom" && errors.pincode.message}
                            </p>}

                            <span onClick={async () => { await getLocation(pincode) }} className="absolute right-2 bottom-[16%] text-[#ff6536] flex items-center cursor-pointer">

                                Locate
                                <IoMdLocate size={25} />
                            </span>
                        </div>


                        <BulkFormInput
                            type="text"
                            label="Locality"
                            required={false}
                            id="locality"
                            register={register}
                        />

                        <BulkFormInput
                            type="text"
                            label="State"
                            required={false}
                            id="state"
                            register={register}
                        />

                        <BulkFormInput
                            type="text"
                            label="City"
                            required={false}
                            id="city"
                            register={register}
                        />


                        <div className="col-span-full mx-auto flex flex-row items-center">
                            <input
                                type="checkbox"
                                id="privacyPolicy"
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setHasChecked(true);
                                    } else {
                                        setHasChecked(false)
                                    }
                                }}
                            />
                            <label htmlFor="privacyPolicy">&nbsp; I&apos;ve read all the <Link className="text-[#ff6536]" href="/privacy-policy">{`Privacy Policies`}</Link> and <Link className="text-[#ff6536]" href="/privacy-policy">{`Terms & Condition`}</Link></label>
                        </div>


                        <input
                            className="w-1/2 sm:col-span-2 mx-auto bg-[#ff6536] text-white rounded-lg px-4 py-2 border-2 border-black hover:bg-white hover:text-[#ff6536] transition duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            type="submit"
                            value="Submit"
                            disabled={isLoading || !hasChecked}
                        />
                    </form>

                </motion.div>
                </div>

            <Loading loading={isLoading} />
            </section>
        </Container>
    )
}

export default ModularInteriorPage;


