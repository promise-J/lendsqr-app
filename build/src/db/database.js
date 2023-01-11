"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const knex = require('knex');
const knexfile_1 = __importDefault(require("../../knexfile"));
const NODE_ENV = process.env.NODE_ENV || 'development';
let db = knex(knexfile_1.default[NODE_ENV]);
exports.default = db;
