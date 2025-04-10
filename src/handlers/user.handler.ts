import { Request, Response } from "express"
import { generateJWT } from "../utils/jwt.util"
import slug from 'slug'
import { checkPassword, hashPassword } from "../utils/auth.util";
import User from "../models/User.Model"


export const getUser = async (req: Request, res: Response) => {
    res.json(req.user)
}

export const createAccount = async (req: Request, res :Response) => {

    const { email, password } = req.body

    const userExists = await User.findOne({email})

    if(userExists){
        const error = new Error("El usuario ya esta registrado")
        res.status(409).json({error : error.message})
        return
    }

    const handle = slug(req.body.handle, '')
    const handleExists = await User.findOne({handle})

    if(handleExists){
        const error = new Error("Nombre de usuario ya disponible")
        res.status(409).json({error : error.message})
        return
    }

    const user = new User(req.body)
    user.password = await hashPassword(password)
    user.handle = handle

    await user.save()

    res.status(201).send("Registro registrado correctamente")
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

    const token = generateJWT({id: user._id, role: user.role})

    res.send(token)
}
