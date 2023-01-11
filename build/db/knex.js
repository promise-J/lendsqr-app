"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const process_1 = require("process");
const connCredentials_1 = __importDefault(require("../config/connCredentials"));
let node_env = process_1.env.NODE_ENV || 'development';
const options = node_env == 'development' ? connCredentials_1.default.development : connCredentials_1.default.production;
exports.default = (0, knex_1.default)(options);
