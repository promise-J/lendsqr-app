"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const info_1 = __importDefault(require("./info"));
const server_1 = __importDefault(require("./server"));
const schemas_1 = __importDefault(require("./schemas"));
const tags_1 = __importDefault(require("./tags"));
const paths_1 = __importDefault(require("./paths"));
const DOCS_OPTIONS = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, info_1.default), server_1.default), schemas_1.default), tags_1.default), paths_1.default);
exports.default = DOCS_OPTIONS;
