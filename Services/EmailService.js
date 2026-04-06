import nodemailer from "nodemailer"
import {google} from "googleapis"
import dotenv from "dotenv"

dotenv.config()
const sendEmailInvitation=async(sender,to,subject,text)=>{
const CLIENT_ID=process.env.CLIENT_ID;
const CLIENT_SECRET=process.env.CLIENT_SECRET;
const REDIRECT_URL=process.env.REDIRECT_URL;
const REFRESH_TOKEN=process.env.REFRESH_TOKEN;
const oAuth2Client=new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URL)
  console.log(REFRESH_TOKEN)
oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN})
console.log(oAuth2Client)
console.log(sender,to,subject,text)
    try{
        const accessToken=await oAuth2Client.getAccessToken();
        console.log("Access Token:", accessToken.token);
        const transporter=nodemailer.createTransport({
            service:"gmail",
            auth:{
                type:"OAuth2",
                user:sender,
                clientId:CLIENT_ID,
                clientSecret:CLIENT_SECRET,
                refreshToken:REFRESH_TOKEN,
                accessToken:accessToken.token,
            }
        }) 
        const mailoptions={
            from:sender,
            to,
            subject,
            text  
        }
        //console.log(CLIENT_ID,CLIENT_SECRET,REDIRECT_URL,REFRESH_TOKEN)
        console.log(transporter)
        const result=await transporter.sendMail(mailoptions)
        console.log(result)
        return result;
    }
    catch(error){
        console.error("Error:", error); // Logs detailed error info
        console.error("Error message:", error.message);
    }
}

export default sendEmailInvitation