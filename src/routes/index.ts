import { Router } from "express";
import { auth } from "../auth/auth";
import { checkWalletBalance, createUser, deleteUser, fundWallet, login, transferFund, withdrawFund } from "../controllers";
const router: Router = Router()

router.route('/user/login').post(login)
router.route('/user').post(createUser).delete(auth, deleteUser)
router.use(auth)
router.route('/wallet').get(checkWalletBalance)
router.route('/wallet/withdraw').put(withdrawFund)
router.route('/wallet/fund').put(fundWallet)
router.route('/wallet/transfer/:receiverId').put(transferFund)

export default router