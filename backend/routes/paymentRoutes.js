import express from "express";
import { cancelSubscription, createSubscription, getRazorpayKey, paymentVerification } from "../controllers/paymentController.js";
import { authorizeSubscribers, isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

router.route("/subscribe").get(isAuthenticated,createSubscription)
router.route("/paymentverification").post(isAuthenticated,paymentVerification)
router.route("/getrazorpaykey").get(getRazorpayKey)
router.route("/cancelsubscription").delete(isAuthenticated,authorizeSubscribers,cancelSubscription)

export default router;