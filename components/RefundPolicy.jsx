import React from "react";

const RefundPolicy = () => {
  return (
    <>
      <h3 className="text-2xl text-black">Refund Process</h3>
      <span className="text-black block text-base">
        Mode of Refund Payment.
      </span>
      <p>
        <ul className="list-disc space-y-2 px-6 mb-2">
          <li>
            Once the item is cancelled, the refund is processed after the
            product has been picked up from the delivery location.
          </li>
          <li>
            You can choose to get your refund either in the original mode of
            payment (Credit Card, Debit Card, Net Banking, Digital Wallets or
            UPI Account) or as your Haroth.com Coupon.
          </li>
          <li>
            If you have availed EMI option – incase of full refund the amount is
            credited to your original mode of payment. However, incase of
            partial refunds, the refund is initiated through NEFT transaction to
            your bank account so that the remaining EMI is not lapsed*.
          </li>
        </ul>
        *There can be variations depending on the T&Cs of the financial service
        provider and time at which return is sought.
      </p>
      <p>
        <span className="text-black block text-base">Refund Timelines</span>
        Haroth.com Wallet – Within 24 Hours The fastest way to get refunds is
        into your Haroth.com Wallet. You can use 100% of refund credits in your
        Haroth.com Wallet for your next purchase. The Haroth.com Refund credits
        are valid for 1 years and are non-transferrable.
      </p>
      <p>
        Original Mode Of Payment Once the refund is initiated, the refund amount
        gets credited to your selected mode of payment in 7-10 business days.
        The refund timeline for various modes is provided below.
      </p>
      <table>
        <thead className="text-base text-black border-b-[1px] border-gray-200">
          <tr>
            <td className="py-2">REFUND MODE</td>
            <td>TIMELINE</td>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b-[1px] border-gray-200">
            <td className="py-2">Credit Card/Debit Card/Net Banking/UPI Account</td>
            <td>4-5 Business Days</td>
          </tr>
          <tr className="border-b-[1px] border-gray-200">
            <td className="py-2">Offline (NEFT)</td>
            <td> 7-10 Business Days</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default RefundPolicy;
