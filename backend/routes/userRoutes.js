import express from "express";
import {
  forgotPassword,
  getUserDetail,
  loginUser,
  logout,
  registerUser,
  resetPassword,
  updatePassword,
  updateProfile,
} from "../controllers/userController.js";
import {isAuthenticatedUser } from "../middleware/auth.js";
const router = express.Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticatedUser, getUserDetail);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);
export default router;
