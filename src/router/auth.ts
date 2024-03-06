import express from "express";
import { UserValidator } from "../validator/AuthValidator";
import { UserController } from "../controller/AuthController";
const userRouter = express.Router();
const userController = new UserController();
const userValidator = new UserValidator();

userRouter.get("/test", (req: any, res: any) => {
  console.log("data");
  res.send("Hello test");
});

userRouter.post(
  "/register-request-otp",
  userValidator.validateRequestOtp,
  userController.registerRequestOtp
);

userRouter.post(
  "/login-request-otp",
  userValidator.validateRequestOtp,
  userController.loginRequestOtp
);

userRouter.post("/register", userValidator.create, userController.register);
userRouter.post("/login", userValidator.login, userController.login);
userRouter.post(
  "/login-with-google",
  userValidator.loginWithGoogle,
  userController.loginWithGoogle
);

export default userRouter;
