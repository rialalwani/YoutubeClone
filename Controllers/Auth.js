import User from "../Models/Auth.js"
import jwt from "jsonwebtoken"

export const login = async (req, res) => {
    const {email} = req.body;
    console.log(email);
    try {
        const existingUser = await User.findOne({email})
        if (!existingUser) {
            try {
                const newUser = await User.create({email});
                console.log(newUser)
                const token = jwt.sign({
                    email: newUser.email,
                    id: newUser._id
                }, process.env.JWT_SECRET, {
                    expiresIn: "1h"
                }
                )
                res.status(200).json({ result: newUser, token });
            }
            catch (error) {
                res.status(500).json({ mess: "Something went wrong..." })
                return
            }
        }
        else {
            console.log(existingUser)
            const token = jwt.sign({
                email: existingUser.email,
                id: existingUser._id
            }, process.env.JWT_SECRET, {
                expiresIn: "1h"
            }
            )
            res.status(200).json({ result: existingUser ,token});
        }
    }
    catch (error) {
        res.status(500).json({ mess: "Something went wrong..." });
        return
    }
}