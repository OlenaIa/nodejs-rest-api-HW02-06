import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

const {API_KEY} = process.env;

sgMail.setApiKey(API_KEY);

export const sendEmail = async (data) => {
    const email = {...data, from: "elena@baydarka.zp.ua"};
    await sgMail.send(email);
    return true;
}