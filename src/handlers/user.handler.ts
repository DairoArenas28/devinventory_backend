import { Request, Response } from "express"
import { generateJWT } from "../utils/jwt.util"
import { checkPassword, hashPassword } from "../utils/auth.util";
import User from "../models/User.Model"


export const getUser = async (req: Request, res: Response) => {
    res.json(req.user)
}

export const login = async (req: Request, res: Response) => {
    
    const { email, password } = req.body

    const user = await User.findOne({email})

    if(!user){
        const error = new Error("El usuario no existe")
        res.status(404).json({error : error.message})
        return
    }

    //COmprobar el password
    const isPasswordCorrect = await checkPassword(password,user.password)

    if(!isPasswordCorrect){
        const error = new Error("Password Incorrecto")
        res.status(401).json({error : error.message})
        return
    }

    const token = generateJWT({id: user._id})

    res.send(token)
}
