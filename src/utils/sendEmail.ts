import nodemailer from "nodemailer";
import "dotenv/config";

// Create a test account or replace with real credentials.

export const sendEmail = async (to: string, html: string) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.SEND_EMAIL,
      },
    });

    const info = await transporter.sendMail({
      // from: '"Maddison Foo Koch" <cornelius79@ethereal.email>',
      // to: "boloroots47@gmail.com",
      // subject: "Buy Me Coffee",
      // text: "Hello world?",
      // html: "<b>Hello world??????</b>",
      from: '"BUY ME COFFEE TEAM" <boloroooturshilt@gmail.com>',
      to,
      subject: "Buy Me Coffee",
      text: "Hello",
      html,
    });
    console.log(info);
    return "success";
  } catch (error) {
    console.log(error);
  }
};
//
