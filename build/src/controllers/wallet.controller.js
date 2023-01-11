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
exports.transferFund = exports.withdrawFund = exports.fundWallet = exports.checkWalletBalance = void 0;
const database_1 = __importDefault(require("../db/database"));
const checkWalletBalance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let result = yield (0, database_1.default)("wallet")
            .where({ user_id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.user_id });
        if (result.length < 1)
            return res.status(400).json('User not found');
        result = result[0];
        return res.status(200).json(`Your balance is ${result.balance}`);
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.checkWalletBalance = checkWalletBalance;
const fundWallet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    if (!req.body.amount)
        return res.status(400).json("Provide deposit amount");
    try {
        const result = yield (0, database_1.default)("wallet")
            .where({ user_id: (_b = req.user) === null || _b === void 0 ? void 0 : _b.user_id })
            .increment({ balance: req.body.amount });
        if (result) {
            return res.status(200).json("Wallet funded successfully");
        }
        else {
            return res.status(400).json("Unable to perform transaction");
        }
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.fundWallet = fundWallet;
const withdrawFund = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    const { amount } = req.body;
    if (!amount)
        return res.status(400).json("Please provide an amount");
    const result = yield (0, database_1.default)("wallet")
        .where({ user_id: (_c = req.user) === null || _c === void 0 ? void 0 : _c.user_id })
        .select("*");
    if (result.length < 1)
        return res.status(400).json("User not found");
    if (result[0].balance < amount)
        return res.status(400).json("You have insufficient balance");
    const withdrawed = yield (0, database_1.default)("wallet")
        .where({ user_id: (_d = req.user) === null || _d === void 0 ? void 0 : _d.user_id })
        .decrement({ balance: amount });
    if (!withdrawed)
        return res.status(400).json("Something went wrong");
    res.status(200).json("Account withdrawal successful");
});
exports.withdrawFund = withdrawFund;
const transferFund = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f;
    const { receiverId } = req.params;
    const { amount } = req.body;
    if (!amount)
        return res.status(400).json("Please enter the amount");
    const result = yield (0, database_1.default)("wallet")
        .where({ user_id: (_e = req.user) === null || _e === void 0 ? void 0 : _e.user_id })
        .select("*");
    if (result[0].balance < req.body.amount)
        return res.status(400).json("You have insufficient balance");
    yield (0, database_1.default)("wallet")
        .where({ user_id: (_f = req.user) === null || _f === void 0 ? void 0 : _f.user_id })
        .decrement({ balance: amount });
    yield (0, database_1.default)("wallet")
        .where({ user_id: receiverId })
        .increment({ balance: amount });
    return res.status(200).json("Transfer Successful");
});
exports.transferFund = transferFund;
