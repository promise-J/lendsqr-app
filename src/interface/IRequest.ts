import {Request} from 'express'
import { ISimpleUSER } from './IUser'

export interface IRequest extends Request {
    user?: ISimpleUSER
}