

  import nodemailer from "nodemailer"

  export const sendMail = async ({ email, subject, html }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: "minhvio12@gmail.com", pass: "vxez jdky bceq rodm" },
  });

  var mailOptions = {
    from: "minhvio12@gmail.com",
    to: email,
    subject: subject,
    html: html,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  //   transporter.verify((error, success) => {
  //     if (error) {
  //       console.log(error);
  //     } else {
  //       console.log("Ready to send email");
  //     }
  //   });
};


