"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_path_1 = __importDefault(require("./user_path"));
const wallet_path_1 = __importDefault(require("./wallet_path"));
const PATHS = {
    paths: Object.assign(Object.assign({}, user_path_1.default), wallet_path_1.default)
};
exports.default = PATHS;
