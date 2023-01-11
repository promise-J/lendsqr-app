"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const user_helper_1 = require("../helpers/user.helper");
function auth(req, res, next) {
    try {
        const secret = process.env.SECRET ? process.env.SECRET : '';
        const token = req.header('auth-token');
        if (!token)
            return res.status(404).json('Oppps! You are unauthorized');
        const { email, user_id } = (0, user_helper_1.verifyToken)(token, secret);
        req.user = { email: email, user_id: user_id };
        // console.log(isVerify)
        next();
    }
    catch (error) {
        return res.status(500).json(error);
    }
}
exports.auth = auth;
