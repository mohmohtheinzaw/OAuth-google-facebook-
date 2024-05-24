"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthValidator_1 = require("../validator/AuthValidator");
const AuthController_1 = require("../controller/AuthController");
const userRouter = express_1.default.Router();
const userController = new AuthController_1.UserController();
const userValidator = new AuthValidator_1.UserValidator();
userRouter.get("/test", (req, res) => {
    console.log("data");
    res.send("Hello test");
});
userRouter.post("/register-request-otp", userValidator.validateRequestOtp, userController.registerRequestOtp);
userRouter.post("/login-request-otp", userValidator.validateRequestOtp, userController.loginRequestOtp);
userRouter.post("/register", userValidator.create, userController.register);
userRouter.post("/login", userValidator.login, userController.login);
userRouter.post("/login-with-google", userValidator.loginWithGoogle, userController.loginWithGoogle);
userRouter.post("/login-with-facebook", userValidator.loginWithFacebook, userController.loginWithFacebook);
exports.default = userRouter;
