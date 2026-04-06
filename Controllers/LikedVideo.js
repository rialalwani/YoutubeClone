import mongoose from "mongoose"
import likedvideosschema from "../Models/Likedvidoes.js"

export const addtolikedvideos = async (req, res) => {
    const data = req.body
    //console.log(req.body,data)
    const addtolikedvideos = new likedvideosschema(data)
    try {
        await addtolikedvideos.save()
        //console.log("works")
        return res.status(200).json("Added to Liked videos")
    }
    catch (error) {
        return res.status(400).json(error.message)
    }
}

export const getlikedvideos = async (req, res) => {
    try {
        const files = await likedvideosschema.find()
        return res.status(200).json(files)
    }
    catch(error){
        return res.status(400).json(error.message)
    }
}

export const deletelikedvideos=async(req,res)=>{
    const {videoid,userid}=req.body
    console.log(req)
    try{
         await likedvideosschema.findOneAndDelete({
            videoid:videoid, userid:userid
         })
         //console.log("works")
         return res.status(200).json("Removed from liked videos")
    }
    catch(error){
        return res.status(400).json(error.message)
    }
}