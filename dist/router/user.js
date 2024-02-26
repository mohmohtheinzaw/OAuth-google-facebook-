"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserValidator_1 = require("../validator/UserValidator");
const UserController_1 = require("../controller/UserController");
const userRouter = express_1.default.Router();
const userController = new UserController_1.UserController();
const userValidator = new UserValidator_1.UserValidator();
userRouter.get("/test", (req, res) => {
    console.log("data");
    res.send("Hello test");
});
userRouter.post("/register-request-otp", userValidator.validateRequestOtp, userController.registerRequestOtp);
userRouter.post("/login-request-otp", userValidator.validateRequestOtp, userController.loginRequestOtp);
userRouter.post("/register", userValidator.create, userController.register);
userRouter.post("/login", userValidator.login, userController.login);
userRouter.post("/login-with-google", userValidator.loginWithGoogle, userController.loginWithGoogle);
exports.default = userRouter;
