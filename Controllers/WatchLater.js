import mongoose from "mongoose"
import whlschema from "../Models/Watchlater.js"

export const addtowhl = async (req, res) => {
    const data = req.body
    //console.log(req.body,data)
    const addtowhl = new whlschema(data)
    try {
        await addtowhl.save()
        //console.log("works")
        return res.status(200).json("Video added to playlist")
    }
    catch (error) {
        return res.status(400).json(error.message)
    }
}

export const getwhl = async (req, res) => {
    try {
        const files = await whlschema.find()
        return res.status(200).json(files)
    }
    catch(error){
        return res.status(400).json(error.message)
    }
}

export const deletewhl=async(req,res)=>{
    const {videoid,userid}=req.body
    //console.log(req,req.body)
    try{
         await whlschema.findOneAndDelete({
            videoid:videoid,userid:userid
         })
         //console.log("works")
         return res.status(200).json("Removed from watch later")
    }
    catch(error){
        return res.status(400).json(error.message)
    }
}