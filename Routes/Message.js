import express from "express"
import { Message,FetchMembers } from "../Controllers/Message.js"
import auth from "../Middleware/auth.js"

const routes=express.Router()

routes.get("/getMessages/:groupid",auth,Message);
routes.get("/getMembersInfo/:groupid",auth,FetchMembers)

export default routes