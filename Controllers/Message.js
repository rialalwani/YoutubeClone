import Group from "../Models/Group.js";
import User from "../Models/Auth.js"

export const Message = async (req, res) => {
    try{
        console.log("groupid",req.params)
    const group = await Group.findById(req.params.groupid)
    console.log(group);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    //console.log(group.messgaes);
    res.status(200).json(group.messages);
    return res;
}
catch(error){
    console.log(error.message);
    return res.status(500).json(error.message)
} 
};


export const FetchMembers=async(req,res)=>{
    try{
       const group = await Group.findById(req.params.groupid)
       console.log(group);
       if (!group) {
        return res.status(404).json({ message: "Group not found" });
       }

       const userIds=[];
       for(const member of group.groupmembers){
         userIds.push(member._id)
       }

       console.log("userIds",userIds);
       
       const users = await User.find({
      _id: { $in: userIds }
       });

       return res.status(200).json(users);
       
    }
    catch(error){
        console.log(error.message)
        return res.status(500).json(error.message)
    }
}
