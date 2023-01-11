"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.login = exports.createUser = void 0;
const database_1 = __importDefault(require("../db/database"));
const uuid_1 = require("uuid");
const helpers_1 = require("../helpers");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, c_password, email } = req.body;
    if (!password || !c_password || !email)
        return res.status(400).json("Please fill the user's fields");
    if (password != c_password)
        return res.status(400).json("Passwords must match");
    const user = yield (0, database_1.default)('user').select().where({ email });
    const hashedPassword = yield (0, helpers_1.hashPassword)(password);
    if (user.length > 0)
        return res.status(400).json('User already exist');
    const user_id = (0, uuid_1.v4)();
    const wallet_id = (0, uuid_1.v4)();
    const newUser = {
        password: hashedPassword,
        email,
        user_id,
    };
    database_1.default.insert(newUser)
        .into("user")
        .then((user) => { });
    const newWallet = {
        user_id,
        wallet_id,
        balance: 2000
    };
    database_1.default.insert(newWallet)
        .into("wallet")
        .then(() => { });
    return res.status(200).json('User created Successfully');
});
exports.createUser = createUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // await db('wallet').del()
        // await db('user').del()
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json('Provide Email and Password');
        let user = yield (0, database_1.default)('user').select('*').where({ email });
        if (user.length < 1)
            return res.status(400).json('You need to register');
        user = user[0];
        const passMatch = yield (0, helpers_1.comparePassword)(password, user.password);
        if (!passMatch)
            return res.status(400).json('Wrong Credentials');
        const secret = process.env.SECRET ? process.env.SECRET : '';
        const token = (0, helpers_1.getToken)({ email: user.email, user_id: user.user_id }, secret);
        return res.status(200).json({ token });
    }
    catch (error) {
        throw new Error('Something went wrong');
    }
});
exports.login = login;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log('promise');
        const user_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.user_id;
        let user = yield (0, database_1.default)('user').select('*').where({ user_id });
        if (user.length < 1)
            return res.status(400).json('User does not exist');
        yield (0, database_1.default)('user').where({ user_id }).del();
        return res.status(200).json('User deleted successfully');
    }
    catch (err) {
        throw new Error('Something went wrong');
    }
});
exports.deleteUser = deleteUser;
