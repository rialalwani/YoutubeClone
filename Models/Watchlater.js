import mongoose from "mongoose";

const whlschema=new mongoose.Schema({
    videoid:{type:String,require:true},
    userid:{type:String,require:true},
    likedon:{type:Date,default:Date.now()}
})

export default mongoose.model("whlschema",whlschema)