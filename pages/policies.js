import Container from "../components/Container";
import { useState } from "react";
import CancelPolicy from "../components/CancelPolicy";
import RefundPolicy from "../components/RefundPolicy";
import WarrantyPolicy from "../components/WarrantyPolicy";
import PrivacyPolicy from "../components/PrivacyPolicy";
import Breadcrumb from "../components/Breadcrumb";
import Head from "next/head";
const PoliciesPage = () => {
  const [policy, setPolicy] = useState("cancel");

  let breadcrumb = [
    {
      name: "Home",
      href: "/"
    }, 
    {
      name: "Policies",
      href: "/policies"
    }
  ]

  return (
    <Container>
      <Head>
        <title>Policies - Haroth.com</title>
        <meta name="description" content="Haroth.com is the one-stop website for all your furniture needs" />
      </Head>
      <section className="lg:px-32 md:px-16 px-6 grid grid-cols-1 md:grid-cols-4 mt-8 pt-16 lg:pt-32">
      <Breadcrumb breadcrumb={breadcrumb} />
        <p className="text-xl md:col-span-4 mb-4">POLICIES</p>
        <aside className="cursor-pointer border-[0px] border-gray-200 max-h-max">
          <p
            onClick={() => { setPolicy("cancel") }}
            className={`hover:bg-[#f8f8f8] border-[1px] transition py-6 px-4 rounded ${policy === "cancel"? "bg-[#f8f8f8] border-b-4 border-gray-400": "bg-[#eee] border-gray-200"}`}
          >         
            Cancel &amp; Return
          </p>
          <p
            onClick={() => { setPolicy("refund") }}
            className={` hover:bg-[#f8f8f8] border-[1px] transition py-6 px-4 rounded ${policy === "refund" ? "bg-[#f8f8f8] border-b-4 border-gray-400": "bg-[#eee] border-gray-200"}`}
          >
            Refund Process
          </p>
          <p
            onClick={() => { setPolicy("warranty") }}
            className={` hover:bg-[#f8f8f8] border-[1px] transition py-6 px-4 rounded ${policy === "warranty" ? "bg-[#f8f8f8] border-b-4 border-gray-400": "bg-[#eee] border-gray-200"}`}
          >
            Warranty Policy
          </p>
          <p
            onClick={() => { setPolicy("privacy") }}
            className={` hover:bg-[#f8f8f8] border-[1px] transition py-6 px-4 rounded ${policy === "privacy" ? "bg-[#f8f8f8] border-b-4 border-gray-400": "bg-[#eee] border-gray-200"}`}
          >
            Privacy Policy
          </p>
        </aside>
        <div className="bg-[#f8f8f8] flex flex-col gap-5 text-sm md:col-span-3 border-[1px] border-gray-200 py-2 px-4 text-gray-500">
          {policy === "cancel" ? (
            <CancelPolicy />
          ) : policy === "refund" ? (
            <RefundPolicy />
          ) : policy === "privacy" ? (
            <PrivacyPolicy />
          ) : (
            <WarrantyPolicy />
          )}
        </div>
      </section>
    </Container>
  );
};

export default PoliciesPage;

//  hover -> #eee

// #f8f8f8
