import express from "express";
import {
  addToPlaylist,
  changeMyPassword,
  deleteMyProfile,
  deleteUser,
  forgotPassword,
  getAllUsers,
  getMyProfile,
  login,
  logout,
  register,
  removeFromPlaylist,
  resetPassword,
  updateMyProfile,
  updateMyProfilePicture,
  updateUserRole,
} from "../controllers/userController.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import { singleUpload } from "../middlewares/multer.js";
const router = express.Router();

router.route("/users").get(getAllUsers);

// user routes
router.route("/signup").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router
  .route("/myprofile")
  .get(isAuthenticated, getMyProfile)
  .delete(isAuthenticated, deleteMyProfile);
router.route("/changepassword").put(isAuthenticated, changeMyPassword);
router.route("/updateprofile").put(isAuthenticated, updateMyProfile);
router
  .route("/updateprofilepicture")
  .put(isAuthenticated, singleUpload, updateMyProfilePicture);
router.route("/forgotpassword").post(forgotPassword);
router.route("/resetpassword/:token").put(resetPassword);
router.route("/addtoplaylist").post(isAuthenticated, addToPlaylist);
router.route("/removefromplaylist").delete(isAuthenticated, removeFromPlaylist);

//Admin Routes
router.route("/admin/users").get(isAuthenticated, authorizeAdmin, getAllUsers);
router
  .route("/admin/user/:id")
  .put(isAuthenticated, authorizeAdmin, updateUserRole)
  .delete(isAuthenticated, authorizeAdmin, deleteUser);
export default router;
