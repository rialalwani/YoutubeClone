import express from "express"
import auth from "../Middleware/auth.js"
import { creategroup,updategroup,deletegroup,getallgroups } from "../Controllers/Group.js"

const routes=express.Router()
routes.post("/creategroup",auth,creategroup)
routes.get("/getallgroups",getallgroups)
routes.patch("/updategroup/:_id",auth,updategroup)
routes.delete("/deletegroup/:_id",auth,deletegroup)

export default routes