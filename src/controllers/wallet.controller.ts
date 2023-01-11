import { Response } from "express";
import { IRequest as Request } from "../interface/IRequest";
import db from "../db/database";

export const checkWalletBalance = async(req: Request, res: Response) => {
  try {
    
    let result = await db("wallet")
    .where({ user_id: req.user?.user_id })
    if(result.length < 1) return res.status(400).json('User not found')
    result = result[0]
    return res.status(200).json(`Your balance is ${result.balance}`)
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const fundWallet = async (req: Request, res: Response) => {
  if (!req.body.amount) return res.status(400).json("Provide deposit amount");
  try {
    const result = await db("wallet")
      .where({ user_id: req.user?.user_id })
      .increment({ balance: req.body.amount });
    if (result) {
      return res.status(200).json("Wallet funded successfully");
    } else {
      return res.status(400).json("Unable to perform transaction");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const withdrawFund = async (req: Request, res: Response) => {
  const { amount } = req.body;
  if (!amount) return res.status(400).json("Please provide an amount");
  const result = await db("wallet")
    .where({ user_id: req.user?.user_id })
    .select("*");
  if (result.length < 1) return res.status(400).json("User not found");
  if (result[0].balance < amount)
    return res.status(400).json("You have insufficient balance");
  const withdrawed = await db("wallet")
    .where({ user_id: req.user?.user_id })
    .decrement({ balance: amount });
  if (!withdrawed) return res.status(400).json("Something went wrong");
  res.status(200).json("Account withdrawal successful");
};

export const transferFund = async (req: Request, res: Response) => {
  const { receiverId } = req.params;
  const { amount } = req.body;
  if (!amount) return res.status(400).json("Please enter the amount");
  const result = await db("wallet")
    .where({ user_id: req.user?.user_id })
    .select("*");
  if (result[0].balance < req.body.amount)
    return res.status(400).json("You have insufficient balance");
  await db("wallet")
    .where({ user_id: req.user?.user_id })
    .decrement({ balance: amount });
  await db("wallet")
    .where({ user_id: receiverId })
    .increment({ balance: amount });
  return res.status(200).json("Transfer Successful");
};
