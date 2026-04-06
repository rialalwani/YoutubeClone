import sendEmailInvitation from "../Services/EmailService.js";
import User from "../Models/Auth.js"

const inviteToGroup=async(req,res)=>{
    const {email,groupname}=req.body
    const joinGroupLink = `http://localhost:3000/join-group?groupname=${encodeURIComponent(groupname)}&email=${encodeURIComponent(email)}`;
    const subject=`Invitation to join ${groupname} group`
    const text=`Hello,\n\nYou have been invited to join ${groupname} group.\n\nClick the link below to join the group:\n\n${joinGroupLink}`
    const sender="rialalwani2003@gmail.com"
    console.log(sender);

    if(!email || !groupname){
       return res.status(404).json("Email and Group name required") 
    }
    try{
        const result=await sendEmailInvitation(
            sender,
            email,
            subject,
            text
        )
        console.log(result)
        return res.status(200).json({message:"Invitation sent successfully",result})
    }
    catch(err){
        return res.status(404).json(err.message)
    }
}

export default inviteToGroup