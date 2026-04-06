"use strict"
import multer from "multer"
import dotenv from "dotenv"


dotenv.config()

const storage=multer.diskStorage({
    destination:(req,res,cb)=>{
        cb(null,"uploads")
    },
    filename:(req,file,cb)=>{
        cb(null,
            new Date().toISOString().replace(/:/g,"-")+"-"+file.originalname
        )
    }
})

const filefilter=(req,file,cb)=>{
    const isMimeValid = file.mimetype === "video/mp4";
    const isExtValid = file.originalname.toLowerCase().endsWith(".mp4");
    if(isMimeValid && isExtValid)
    {
        cb(null,true)
    }
    else{
        cb(new Error("Only MP4 video files are allowed"), false);
    }
}

const upload=multer({storage:storage,fileFilter:filefilter})
export default upload