import { Response } from "express";
import { IRequest as Request } from "../interface/IRequest";
import db from "../db/database";
import { v4 as uuidv4 } from "uuid";
import { comparePassword, getToken, hashPassword } from "../helpers";

export const createUser = async (req: Request, res: Response) => {
    const { password, c_password, email } = req.body;
    if (!password || !c_password || !email)
    return res.status(400).json("Please fill the user's fields");
    if (password != c_password)
      return res.status(400).json("Passwords must match");
    const user = await db('user').select().where({email})
    const hashedPassword: string = await hashPassword(password)
    if(user.length > 0) return res.status(400).json('User already exist')
    const user_id = uuidv4();
    const wallet_id = uuidv4();
    const newUser = {
      password: hashedPassword,
      email,
      user_id,
    };

    db.insert(newUser)
      .into("user")
      .then((user: any) => {});

    const newWallet = {
      user_id,
      wallet_id,
      balance: 2000
    };
    db.insert(newWallet)
      .into("wallet")
      .then(() => {});
      return res.status(200).json('User created Successfully')
};

export const login = async(req: Request, res: Response)=> {
    try {
        // await db('wallet').del()
        // await db('user').del()
        const {email, password} = req.body
        if(!email || !password) return res.status(400).json('Provide Email and Password')
        let user = await db('user').select('*').where({email})
        if(user.length < 1) return res.status(400).json('You need to register')
        user = user[0]
        const passMatch = await comparePassword(password, user.password)
        if(!passMatch) return res.status(400).json('Wrong Credentials')
        const secret = process.env.SECRET ? process.env.SECRET : ''
        const token = getToken({email: user.email, user_id: user.user_id}, secret)


        return res.status(200).json({token})
    } catch (error) {
        throw new Error('Something went wrong')
    }
}


export const deleteUser = async(req: Request, res: Response)=>{
    try{
        console.log('promise')
        const user_id = req.user?.user_id
        let user = await db('user').select('*').where({user_id})
        if(user.length < 1) return res.status(400).json('User does not exist')
        await db('user').where({user_id}).del()
        return res.status(200).json('User deleted successfully')
    }catch(err){
        throw new Error('Something went wrong')
    }

}