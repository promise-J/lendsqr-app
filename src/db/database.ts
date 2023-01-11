import dotenv from 'dotenv'
dotenv.config()
const knex = require('knex')
import config from '../../knexfile'
const NODE_ENV = process.env.NODE_ENV || 'development'


let db = knex(config[NODE_ENV])

export default db