import translate from "google-translate-api-x"

const transaltecontroller = async (req, res) => {
    const { comment, to} = req.body;
    console.log(comment,to)
    try {
        const transaltedtext = await translate(comment, {to:to})
        console.log(transaltedtext.text)
        return res.status(200).json(transaltedtext.text)
    }
    catch(error){
        console.log(error.message)
        return res.status(400).json(error.message)
    }
}

export default transaltecontroller