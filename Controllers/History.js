import mongoose from "mongoose";
import  historyschema  from "../Models/History.js";

export const historycontroller=async(req,res)=>{
    const historydata=req.body
    //console.log(req.body,historydata)
    const addtohistory=new historyschema(historydata)
    try{
        await addtohistory.save()
        return res.status(200).json("Added to history")
    }
    catch(error){
        return res.status(400).json(error.message)
    }
}

export const getallhistory=async(req,res)=>{
    try{
        const historydata=await historyschema.find()
        //console.log(historydata)
        return res.status(200).json(historydata)
    }
    catch(error){
        return res.status(404).json(error.message)
    }
}

export const deletehistory=async(req,res)=>{
    const {userid}=req.params
    //console.log(userid)
    try{
        await historyschema.deleteMany({
            userid:userid
        }) 
        //console.log("works")
        return res.status(200).send("Deleted history")
    }
    catch(error)
    {
        return res.status(404).json(error.message)
    }
}