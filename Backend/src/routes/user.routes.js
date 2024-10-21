import {
  registerUser,
  loginUser,
  getUserById,
  getUser,
} from "../controller/user.Controller.js";
import express from "express";
import {
  validateLogin,
  validateRegistration,
} from "../middleware/userValidation.middleware.js";
import { verifyJwtToken } from "../middleware/verifyJwtToken.middleware.js";

const userRouter = express.Router();

userRouter.route("/register").post(validateRegistration, registerUser);

userRouter.route("/login").post(validateLogin, loginUser);

userRouter.route("/:id").get(verifyJwtToken, getUserById);

userRouter.route("/").get(verifyJwtToken, getUser);

export default userRouter;
