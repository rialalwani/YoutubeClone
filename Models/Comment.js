import mongoose from "mongoose";
const commentschema=new mongoose.Schema({
    videoid:String,
    commentbody:String,
    userid:String,
    usercommented:String,
    commentedon:{type:Date,default:Date.now},
    likes:{type:Number,default:0}
})

export default mongoose.model("Comments",commentschema)