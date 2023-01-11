import {knex} from 'knex'
export interface newUser {

}

export interface ITokenData {
    email: string,
    user_id: string
}

export interface IUser {
    email: string,
    password: string,
    user_id: string,
    created_at: string,
    updated_at: string
}

export interface ISimpleUSER {
    email: string,
    user_id: string
}

export interface JwtPayloadData {
    email: string,
    user_id: string
}