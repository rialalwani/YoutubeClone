import express from "express"
import { historycontroller,getallhistory,deletehistory } from "../Controllers/History.js"
import auth from "../Middleware/auth.js"

export const historyroutes=express.Router()
historyroutes.post("/addtohistory",auth,historycontroller)
historyroutes.get("/getallhistory",getallhistory)
historyroutes.delete("/deletehistory/:userid",auth,deletehistory)
