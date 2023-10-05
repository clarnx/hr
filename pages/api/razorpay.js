// pages/api/razorpay.js
const Razorpay = require("razorpay");
const shortid = require("shortid");

console.log("KEY ID", process.env.NEXT_PUBLIC_RAZORPAY_ID)
console.log("SECRET", process.env.NEXT_PUBLIC_RAZORPAY_KEY)

// Initialize razorpay object


async function handler(req, res) {

    const data = await req.body;

    console.log("DATA ", data)

    const razorpay = new Razorpay({
        key_id: process.env.NEXT_PUBLIC_RAZORPAY_ID,
        key_secret: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
    });

    const payment_capture = 1;

    console.log("USER ID", data.id)
    const amount = data.totalAmount;
    const options = {
      amount: (amount * 100).toString(),
      currency: "INR",
      receipt: shortid.generate(),
      payment_capture,
    };

    try {
      const response = await razorpay.orders.create(options);
      

      console.log("RESPONSE ", response)

      return res.status(200).json({
        id: response.id,
        currency: response.currency,
        amount: response.amount,
      });


    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }

}
export default handler
