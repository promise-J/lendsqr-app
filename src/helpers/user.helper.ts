import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { ITokenData } from '../interface/IUser'

export const hashPassword = async(password: string)=>{
    return  bcrypt.hash(password, 10)
}

export const comparePassword = async(password: string, encPassword: string)=>{
    return bcrypt.compare(password, encPassword)
}

export const getToken = (data: ITokenData, secret: string)=>{
    return jwt.sign(data, secret, {expiresIn: '1d'})
}

export const verifyToken = (token: string, secret: string)=>{
    return jwt.verify(token, secret)
}