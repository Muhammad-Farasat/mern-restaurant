import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

const frontend_url = process.env.URL
console.log(frontend_url);

export const senderEmailVerification = async(email, token) => {
    const verificationLink = `${frontend_url}/verify-email/${token}`
    // console.log(verificationLink);
    


    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Verify you email',
        html: `<p>Click the link below to verify your email:</p> 
               <a href="${verificationLink}">Verify Email</a>`
    }

    try {
        await transport.sendMail(mailOptions)
        // console.log("Email sent");
        
    } catch (error) {
        console.log("Can't send", error);
        
    }

}