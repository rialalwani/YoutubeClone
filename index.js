import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import userroutes from "./Routes/User.js";
import videoroutes from "./Routes/Video.js"
import path from "path"
import commentroutes from "./Routes/Comment.js"
import { historyroutes } from "./Routes/History.js";
import grouproutes from "./Routes/Group.js"
import emailroutes from "./Routes/emailroutes.js";
import http from "http"
import initializeSocket from "./socket.js";
import auth from "./Middleware/auth.js";
import msgRoutes from "./Routes/Message.js"
import livekitRoutes from "./Routes/liveKitRoutes.js";

dotenv.config()

const app=express()
const server=http.createServer(app)
//app.use(cors({origin:true,credentials:true}))
app.use(cors({
  origin: [
    'http://localhost:3000'
  ]
}));
app.use(express.json({limit:"30mb", extended:"true"}))
app.use(express.urlencoded({limit:"30mb",extended:"true"}))
app.use("/uploads",express.static(path.join('uploads')))
app.use("/livekit", livekitRoutes);


initializeSocket(server)

app.get('/',(req,res)=>{
    res.send("YourTube is working")
})
app.use(bodyParser.json())
app.use('/user',userroutes)
app.use('/video',videoroutes)
app.use('/comment',commentroutes)
app.use('/history',historyroutes)
app.use('/group',grouproutes)
app.use('/group',emailroutes)

const PORT=process.env.PORT || 5000

server.listen(PORT,()=>{
    console.log(`YourTube running on ${PORT}`)
})

const DB_URL=process.env.DB_URL;
mongoose.connect(DB_URL).then(()=>{
    console.log("Mongodb database connected")
}).catch((error)=>{
    console.log(error.message)
})

app.use("/group",msgRoutes)