import Comments from "../Models/Comment.js"
import mongoose from "mongoose"

export const likecomment=async(req,res)=>{
    const {_id}=req.params;
    const {likes}=req.body;
    console.log(_id,likes)
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).json("Comment does not exist")
    }
    try{
        const updatelike=await Comments.findByIdAndUpdate(_id,{
            $set:{"likes":likes}
        },{new:true})
        console.log(updatelike)
        return res.status(200).json(updatelike)
    }
    catch(error){
        console.log(error.message)
        return res.status(404).json(error.message)
    }
}