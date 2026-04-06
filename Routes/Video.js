import express from "express"
import { likevideocontroller } from "../Controllers/Like.js";
import { viewscontroller } from "../Controllers/Views.js";
import { uploadvideo,getallvideos} from "../Controllers/VideoFile.js";
import upload from "../Helper/filehelper.js"
import auth from "../Middleware/auth.js"
import { addtolikedvideos,getlikedvideos,deletelikedvideos } from "../Controllers/LikedVideo.js";
import { addtowhl,getwhl,deletewhl } from "../Controllers/WatchLater.js";

const routes=express.Router();
routes.post("/uploadvideo",auth,upload.single('file'),uploadvideo)
routes.get("/getallvideos",getallvideos)
routes.patch("/like/:id",auth,likevideocontroller)
routes.patch("/views/:id",viewscontroller)

routes.post("/addtolikedvideos",auth,addtolikedvideos)
routes.get("/getlikedvideos",getlikedvideos)
routes.delete("/deletelikedvideos",auth,deletelikedvideos)

routes.post("/addtowhl",auth,addtowhl)
routes.get("/getwhl",getwhl)
routes.delete("/deletewhl",auth,deletewhl)

export default routes