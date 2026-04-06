import mongoose from "mongoose";
import Comments from "../Models/Comment.js"

export const postcomment = async (req, res) => {
    const commentdata = req.body;
    const postcomment = new Comments(commentdata);
    try {
        await postcomment.save();
        return res.status(200).json("Posted comment succesfully")
    }
    catch (error) {
        return res.status(404).json(error.message)
    }
}

export const getcomment = async (req, res) => {
    try {
        const commentlist = await Comments.find();
        return res.status(200).send(commentlist)
    }
    catch (error) {
        return res.status(404).send(error.message)
    }
}

export const deletecomment = async (req, res) => {
    const { id } = req.params;
    //console.log(req,id)
    if (!mongoose.Types.ObjectId.isValid(id)) {
        //console.log("valid id")
        return res.status(404).send("Comments unavailable")
    }
    try{
        //console.log("deleted")
        await Comments.findByIdAndDelete(id)
        return res.status(404).send("Comment Deleted")
    }
    catch(error){
        return res.status(404).send(error.message)
    }
}

export const editcomment=async(req,res)=>{
    const {id}=req.params;
    const {commentbody}=req.body;
    //console.log(req.body,id,commentbody)
    if(!mongoose.Types.ObjectId.isValid(id)){
        //console.log("valid id")
        return res.status(404).send("Comments unavailable")
    }
    try{
        const updatecomment=await Comments.findByIdAndUpdate(
            id,{
                $set:{"commentbody":commentbody}
            },
            {new:true}
        )
        //console.log(updatecomment)
        return res.status(200).json(updatecomment) 
    }
    catch(error){
       return res.status(404).json(error.message)
    }
}