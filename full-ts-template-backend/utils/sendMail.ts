import nodemailer from "nodemailer";

export default async function sendEmail(to: string, html: string) {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "kaleigh.hackett64@ethereal.email",
      pass: "UFRnWYN2YqG15bN134",
    },
  });

  // send mail with defined transport object
  transporter
    .sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: to, // list of receivers
      subject: "Change Password", // Subject line
      html: html, // plain text body
      //text:text
      //html: "<b>Hello world?</b>", // html body
    })
    .then((info) => {
      console.log(info);
    })
    .catch((err) => {
      console.log(err);
    });
}
