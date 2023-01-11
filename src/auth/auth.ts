import { NextFunction, Response } from "express";
import { IRequest as Request } from "../interface/IRequest";
import { verifyToken } from "../helpers/user.helper";
import { JwtPayloadData } from "../interface/IUser";

export function auth(req: Request, res: Response, next: NextFunction){
    try {
        
        const secret = process.env.SECRET ? process.env.SECRET : ''
        const token = req.header('auth-token')
        if(!token) return res.status(404).json('Oppps! You are unauthorized')
        const {email, user_id} = verifyToken(token, secret) as JwtPayloadData
        req.user = {email: email, user_id: user_id}
        // console.log(isVerify)
        next()
    } catch (error) {
        return res.status(500).json(error)
    }
}