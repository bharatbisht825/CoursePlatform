import express from "express";
import { contactUs, getDashboardStats, requestCourse } from "../controllers/otherControllers.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

router.route("/contact").post(contactUs)
router.route("/requestcourse").post(requestCourse)
router.route("/admin/stats").get(isAuthenticated,authorizeAdmin,getDashboardStats)
export default router;