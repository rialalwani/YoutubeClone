import express from "express"
import {login} from "../Controllers/Auth.js";
import {updatechanneldata,getallchannel} from "../Controllers/Channel.js"

const routes=express.Router();
routes.post('/login',login)
routes.patch('/update/:id',updatechanneldata)
routes.get('/getallchannels',getallchannel)

export default routes;
