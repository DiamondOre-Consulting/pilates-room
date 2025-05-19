import nodemailer from "nodemailer"

export const sendMail = async(title,email,subject,message)=>{

    const transporter = nodemailer.createTransport({
        service : "gmail",
        host : 'smtp.gmail.com',
        port : 465,
        secure: true,
        auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD
        }
    });

    transporter.sendMail({
        from : `${title} <${process.env.SMTP_FROM_EMAIL}>`,
        to: email,
        subject: subject,
        html: message
    })

}