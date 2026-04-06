import mongoose from "mongoose"

const historyschema=new mongoose.Schema({
    videoid:{type:String,require:true},
    userid:{type:String,require:true},
    likedon:{type:Date,default:Date.now()}
})

export default mongoose.model("historyschema",historyschema)