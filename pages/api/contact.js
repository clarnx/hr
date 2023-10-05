const nodemailer = require("nodemailer");
export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(500).json({ message: "Wrong request method!" })
  }


  let transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: 'cs@haroth.com',
      pass: '&o5lyH#++M'
    }
  });
  const { data, type } = await req.body;

  try {
    if (type == "bulk") {

      // FOR BULK ORDER
      const info = await transporter.sendMail({
        from: '"Bulk Order 📦" cs@haroth.com', // sender address
        to: "lead@haroth.com", // list of receivers
        subject: `Bulk Order - ${data.name}`, // Subject line
        text: "Hello world?", // plain text body
        html: `
              <p>
              <strong>Name: </strong> ${data.name}
              </p>
              <br />

              <p>
              <strong>Email: </strong> ${data?.email}
              </p>
              <br />
    
              <p>
              <strong>Phone No.:</strong> ${data?.mobileno}
              </p>
              <br/>

              <p>
              <strong>Pincode: </strong> ${data.pincode}
              </p>
              <br />
    
              <p>
              <strong>Locality: </strong> ${data.locality}
              </p>
              <br />

              <p>
              <strong>State: </strong> ${data.state}
              </p>
              <br />

              <p>
              <strong>City: </strong> ${data.city}
              </p>
              <br />

              <p>
              <strong>Company Name: </strong> ${data.companyName}
              </p>
              <br />

              <p>
              <strong>Business Ph No: </strong> ${data.businessPhoneNo}
              </p>
              <br />

              <p>
              <strong>Address: </strong> ${data.address}
              </p>
          `, // html body
      });

      const responseInfo = await transporter.sendMail({
        from: '"Haroth.com" cs@haroth.com', // sender address
        to: data?.email, // list of receivers
        subject: `Reply - Haroth`, // Subject line
        text: "Hello world?", // plain text body
        html: `
         Hey ${data.name}!

         We've successfully received your message for BULK ORDER.
         <br />

         Sit back & Relax.

         Our team will call you to get in touch
          `, // html body
      });

    }

    if (type == "callback") {
      // FOR CALLBACK
      const info = await transporter.sendMail({
        from: '"New Lead 🚀" cs@haroth.com', // sender address
        to: "lead@haroth.com", // list of receivers
        subject: `${data.name}`, // Subject line
        text: "Hello world?", // plain text body
        html: `
            <p>
              <strong>Name: </strong> ${data.name}
              </p>
              <br />
    
              <p>
              <strong>Phone No.:</strong> ${data.phone}
              </p>
              <br/>
              <p>
              <strong>Email: </strong> ${data.email}
              </p>
              <br />
    
              <p>
              <strong>City: </strong> ${data.city}
              </p>
              <br />
              <p>
              <strong>Message: </strong> ${data.msg}
              </p>
            `, // html body
      });

      const responseInfo = await transporter.sendMail({
        from: '"Haroth.com" lead@haroth.com', // sender address
        to: data?.email, // list of receivers
        subject: `Reply - Haroth`, // Subject line
        text: "Hello world?", // plain text body
        html: `
         Hey ${data.name}!

         We've successfully received your message.
         <br />

         Sit back & Relax.<br />

         Our team will call you to get in touch
          `, // html body
      });


    }


    if (type == "contact") {
      // FOR MODULAR AND INTERIOR CONTACT

      const info = await transporter.sendMail({
        from: '"Design Lead 🚀" cs@haroth.com', // sender address
        to: "lead@haroth.com", // list of receivers
        subject: `${data.name}`, // Subject line
        text: "Hello world?", // plain text body
        html: `
        <p>
        <strong>Name: </strong> ${data.name}
        </p>
        <br />

        <p>
        <strong>Email: </strong> ${data?.email}
        </p>
        <br />

        <p>
        <strong>Phone No.:</strong> ${data?.mobileno}
        </p>
        <br/>

        <p>
        <strong>Pincode: </strong> ${data.pincode}
        </p>
        <br />

        <p>
        <strong>Locality: </strong> ${data.locality}
        </p>
        <br />

        <p>
        <strong>State: </strong> ${data.state}
        </p>
        <br />

        <p>
        <strong>City: </strong> ${data.city}
        </p>
        <br />
            `, // html body
      });

      const responseInfo = await transporter.sendMail({
        from: '"Haroth.com" cs@haroth.com', // sender address
        to: data?.email, // list of receivers
        subject: `Reply - Haroth`, // Subject line
        text: "Hello world?", // plain text body
        html: `
         Hey ${data.name}!

         We've successfully received your message.
         <br />

         Sit back & Relax.<br />

         Our team will call you to get in touch
          `, // html body
      });

    }


    if (type == "factory-visit") {

      // FOR Visit-Factory
      const info = await transporter.sendMail({
        from: '"Bulk Order 📦" cs@haroth.com', // sender address
        to: "lead@haroth.com", // list of receivers
        subject: `Factory Visit - ${data.name}`, // Subject line
        text: "Hello world?", // plain text body
        html: `
              <p>
              <strong>Name: </strong> ${data.name}
              </p>
              <br />

              <p>
              <strong>Email: </strong> ${data?.email}
              </p>
              <br />
    
              <p>
              <strong>Phone No.:</strong> ${data?.mobileno}
              </p>
              <br/>

              <p>
              <strong>Pincode: </strong> ${data.pincode}
              </p>
              <br />
    
              <p>
              <strong>Locality: </strong> ${data.locality}
              </p>
              <br />

              <p>
              <strong>State: </strong> ${data.state}
              </p>
              <br />

              <p>
              <strong>City: </strong> ${data.city}
              </p>
              <br />

              <p>
              <strong>Company Name: </strong> ${data.companyName}
              </p>
              <br />

              <p>
              <strong>Business Ph No: </strong> ${data.businessPhoneNo}
              </p>
              <br />

              <p>
              <strong>Address: </strong> ${data.address}
              </p>
          `, // html body
      });

      const responseInfo = await transporter.sendMail({
        from: '"Haroth.com" cs@haroth.com', // sender address
        to: data?.email, // list of receivers
        subject: `Reply - Haroth`, // Subject line
        text: "Hello world?", // plain text body
        html: `
         Hey ${data.name}!

         We've successfully received your message for BULK ORDER.
         <br />

         Sit back & Relax.

         Our team will call you to get in touch
          `, // html body
      });

    }





    return res.status(200).json({ message: "mail sent successfully" })
  } catch (error) {
    console.log("ERROR SENDING EMAIL", error);
    return res.status(400).json({ message: "ERROR SENDING EMAIL" })
  }

}



// 753793465752-85b6df3csbraafaj1gfgmndds3pjhgcq.apps.googleusercontent.com
// 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