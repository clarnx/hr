import { otpGen } from "otp-gen-agent"
import axios from "axios"

export default async function(req, res) {

   try {
      if(req.method === "POST") {

         let { phone_number } = await req.body;
         console.log("Phone Number --> ", phone_number)

        const otp = await otpGen();

      console.log("Generated OTP -> ", otp)

      let sendMessage = await axios.get(`https://www.fast2sms.com/dev/bulkV2?authorization=m93yezSkcfj6217ERrHdapZ5VslMgFhIvxqoW4NXBtDCLnKJQ8JdoAHI9nlYZGjUafDz024FO75y3rsS&route=dlt&sender_id=HAROTH&message=159307&variables_values=${otp}&flash=0&numbers=${phone_number}`)

      return res.status(200).json({ otp })
      
   } else {
      return res.status(404).json({ message: "Wrong Request Method" })
   }
   } catch (error) {
      console.log(error)
      res.status(404).json(error);
   }
   


}