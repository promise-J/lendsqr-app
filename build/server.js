"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
function makeApp() {
    app.get("/", (req, res) => {
        res.json({ message: "You are welcome to lendsqr" });
    });
    return app;
}
exports.default = makeApp;
