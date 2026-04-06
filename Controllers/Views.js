 import Videofiles from "../Models/Videofile.js"
import mongoose from "mongoose"
export const viewscontroller = async (req, res) => {
    const { id } = req.params
    console.log(id)
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json("Video unavailable")
    }
    try{
        const file=await Videofiles.findById(id)
        const views=file.views
        const updateview=await Videofiles.findByIdAndUpdate(
            id,{
                $set:{views:views+1}
            }
        )
        res.status(200).json(updateview)
    }
    catch(error)
    {
        res.status(404).json(error)
    }
}