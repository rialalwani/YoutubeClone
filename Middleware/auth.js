import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()
const auth=(req,res,next)=>{
    try{
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(400).json("Authorization token missing or invalid");
        }
        const token = authHeader.split(" ")[1];
         //console.log(token)
         let decodedata=jwt.verify(token,process.env.JWT_SECRET)
         //console.log(decodedata)
         req.userid=decodedata?.id
         next()
    }
    catch(error)
    {
        console.log("error")
        res.status(400).json(error.message)
    }
}

export default auth