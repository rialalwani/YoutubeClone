import mongoose from "mongoose";
import  Groupschema from "../Models/Group.js"

export const creategroup=async(req,res)=>{
    const {groupname,groupmembers,createdBy}=req.body;
    const groupdata=new Groupschema({
        groupname:groupname,
        groupmembers:groupmembers,
        createdBy:createdBy
    })
    console.log(groupdata)
    try{
        const data=await groupdata.save()
        console.log(data)
        console.log("group created")
        return res.status(200).json(data)
    }
    catch(error){
        return res.status(400).json(error.message)
    }
}

export const  getallgroups=async(req,res)=>{
    try{
        const groups=await Groupschema.find()
        console.log(groups)
        return res.status(200).json(groups)
    }
    catch(error){
        return res.status(400).json(error.message)
    }
}

export const updategroup=async(req,res)=>{
    const {_id}=req.params;
    const {groupname,groupmembers,createdBy}=req.body;
    console.log(_id)
    if(!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).json("Group unavailable")

    try{
        const updateddata=await Groupschema.findByIdAndUpdate(
            _id,{
            $set:{
                groupname:groupname,
                groupmembers:groupmembers,
                createdBy:createdBy
            },
        },
        {new:true}
    )
    console.log(updateddata)
        return res.status(200).json(updateddata)
    }
    catch(error){
        return res.status(400).json(error.message)
    }
}

export const deletegroup=async(req,res)=>{
    const {_id}=req.params;
    const {userid}=req.body;
    console.log(userid,_id)
    if(!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).json("Group unavailable")
    if(!mongoose.Types.ObjectId.isValid(userid))
        return res.status(404).json("Invalid userid")
    try{
        const groupdata=await Groupschema.findById(_id)
        console.log(groupdata.createdBy._id.toString())
        if(groupdata.createdBy._id.toString()===userid)
        {
            const data=await Groupschema.findByIdAndDelete(_id)
            console.log("deleted")
            return res.status(200).json(data)
        }
        else
        {
            return res.status(200).json("Only admin can delete the group")
        }
    }
    catch(error){
        return res.status(400).json(error.message)
    }
}