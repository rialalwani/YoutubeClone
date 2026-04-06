import express from "express"
import auth from "../Middleware/auth.js"
import inviteToGroup from "../Controllers/EmailController.js"

const emailroutes=express.Router()
emailroutes.post("/sendinvitation",auth,inviteToGroup)

export default emailroutes