import React from "react";
import { BsShieldCheck, BsShieldX } from "react-icons/bs";
import { FaMoneyBillTransfer } from "react-icons/fa6";

const WarrantPolicy = () => {
  return (
    <>
      <h3 className="text-2xl text-black">Warranty Policy</h3>
      <p>
        <span className="text-black text-base flex items-center gap-6 w-full my-4">
          <FaMoneyBillTransfer size={30} /> Mode of Refund Payment.
        </span>
        You can claim for replacement or return of the items that come under the
        warranty as offered by various brands on Haroth.com. The warranty is
        eligible for all types of manufacturing defect in the product. To know
        the warranty period and warranty terms, please refer to the warranty
        description on the product page on Haroth.com.
      </p>
      <p>
        <span className="text-black text-base flex items-center gap-6 w-full my-4">
          <BsShieldCheck size={30} /> What&apos;s Covered?
        </span>
        <ul className="list-disc space-y-2 my-2 px-6">
          <li>
            Repair* or return of the item during the warranty period, subject to
            the review, verification, and confirmation of the manufacturing
            defect by the Resolution team in consultation with the merchant.
          </li>
          <li>
            Repair* or return of the item shall happen only at the shipping
            address provided at the time of purchase.
          </li>
          <li>
            Repair* or return of the item will be honoured only in cases of no
            alteration or modification in the originally purchased product.
          </li>
        </ul>
        *If the product is not repairable, the refund will be processed only in the form of Refund Credits in your Bank account.
      </p>


      <p>
        <span className="text-black text-base flex items-center gap-6 w-full my-4">
          <BsShieldX size={30} />What&apos;s Not Covered?
        </span>
        <ul className="list-disc space-y-2 my-2 px-6">
          <li>
          Damages due to usage of the product beyond its intended use.
          </li>
          <li>
          Damage in the product resulting due to improper installation or assembly by a third party brand or seller (not associated with Haroth.com), improper and irregular maintenance of the furniture, inappropriate storage ways, water or moisture damage, discolouration due to direct exposure to sunlight, etc.
          </li>
          <li>
          Breakages in glass or mirror, torn-off stitches, and marks in the products after acknowledgement of the proper open delivery of the product.
          </li>
        </ul>
      </p>
    </>
  );
};

export default WarrantPolicy;
