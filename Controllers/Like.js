import VideoFiles from "../Models/Videofile.js"
import mongoose from "mongoose"

export const likevideocontroller=async(req,res)=>{
    const {id}=req.params
    const {Like}=req.body
     //console.log(req.body,id,Like)
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send("Video unavailable")
    }
    try{
        //console.log(VideoFiles.findById(id))
        const updatelike=await VideoFiles.findByIdAndUpdate(
            id,{
                $set:{"likes":Like>=0?likes:0}
            },
            {new:true}
        )
        //console.log(updatelike)
        return res.status(200).json(updatelike)
    }
    catch(error)
    {
        return res.status(404).json("error",error)
    }
}