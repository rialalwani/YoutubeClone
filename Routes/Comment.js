import express from "express"
import {postcomment,getcomment,deletecomment,editcomment} from "../Controllers/Comment.js"
import auth from "../Middleware/auth.js";
import translatecontroller from "../Controllers/Translate.js"
import { likecomment } from "../Controllers/LikeComment.js";

const routes=express.Router();
routes.post("/postcomment",auth,postcomment)
routes.get("/getcomment",getcomment)
routes.patch("/editcomment/:id",auth,editcomment)
routes.delete("/deletecomment/:id",auth,deletecomment)
routes.post("/translate",translatecontroller)
routes.patch("/like/:_id",auth,likecomment)

export default routes