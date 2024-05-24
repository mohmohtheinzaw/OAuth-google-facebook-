"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const response_1 = __importDefault(require("../utilities/response"));
const http_status_codes_1 = require("http-status-codes");
const index_1 = __importDefault(require("../helper/index"));
const User_1 = __importDefault(require("../models/User"));
const Otp_1 = __importDefault(require("../models/Otp"));
const google_1 = require("../Google/google");
class UserController {
    checkUserExist(phone) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("phone ", phone);
            return User_1.default.findOne({ phone }).lean();
            // return data;
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDoc = req.body;
            try {
                const admin = new User_1.default(userDoc);
                admin.password = index_1.default.getHashed(userDoc.password);
                yield admin.save();
                response_1.default.respondStatus(res, "Admin created successfully", http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                response_1.default.respondError(res, error, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
    }
    // async createOtp(phone: string) {
    //   try {
    //     const code = Math.floor(100000 + Math.random() * 900000);
    //     const data = await this.dbService.otp.upsert({
    //       where: {
    //         phone: phone,
    //       },
    //       update: {
    //         code: phone === '09123456789' ? '555555' : code.toString(),
    //         otpStatus: 'UNUSED',
    //       },
    //       create: {
    //         code: phone === '09123456789' ? '555555' : code.toString(),
    //         phone,
    //         otpStatus: 'UNUSED',
    //       },
    //     });
    //     return data;
    //   } catch (error) {
    //     throw new BadRequestException({
    //       message: 'Send otp fail',
    //       code: HttpStatus.BAD_REQUEST,
    //     });
    //   }
    // }
    registerRequestOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const code = Math.floor(100000 + Math.random() * 900000);
                console.log(code);
                console.log(req.body.phone);
                const data = yield Otp_1.default.findOne({ phone: req.body.phone }).lean();
                let updateData = {
                    code: req.body.phone === "09123456789" ? "555555" : code.toString(),
                    status: "unused",
                };
                if (data) {
                    Otp_1.default.updateOne({ phone: req.body.phone }, updateData);
                }
                else {
                    yield Otp_1.default.create({
                        phone: req.body.phone,
                        code: updateData.code,
                        status: updateData.status,
                    });
                }
                console.log("here");
                response_1.default.respondResult(res, "otp sent", http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                response_1.default.respondError(res, error, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
    }
    loginRequestOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield User_1.default.findOne({ phone: req.body.phone });
                console.log(data);
                if (!data) {
                    res.send("User not found").status(400);
                }
                const code = Math.floor(100000 + Math.random() * 900000);
                const otp = yield Otp_1.default.findOne({ phone: req.body.phone }).lean();
                let updateData = {
                    code: req.body.phone === "09123456789" ? "555555" : code.toString(),
                    status: "unused",
                };
                if (otp) {
                    const data = yield Otp_1.default.updateOne({ phone: req.body.phone }, updateData);
                    console.log("555555");
                    response_1.default.respondResult(res, data, http_status_codes_1.StatusCodes.OK);
                }
                else {
                    const data = yield Otp_1.default.create({
                        phone: req.body.phone,
                        code: updateData.code,
                        status: updateData.status,
                    });
                    data.code = code;
                    response_1.default.respondResult(res, data, http_status_codes_1.StatusCodes.OK);
                }
            }
            catch (error) {
                response_1.default.respondError(res, error, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
    }
    checkOtp(phone, code) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("hre");
            const data = yield Otp_1.default.findOne({
                phone: phone,
                code: code,
                status: "unused",
            }).lean();
            console.log(data);
            return data;
        });
    }
    updateOtpStatus(phone, code) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield Otp_1.default.updateOne({ phone: phone, code: code }, { status: "used" });
            return data;
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Otp_1.default.findOne({
                    phone: req.body.phone,
                    code: req.body.code,
                    status: "unused",
                });
                if (!data) {
                    response_1.default.respondError(res, "otp not match", http_status_codes_1.StatusCodes.NOT_FOUND);
                }
                yield Otp_1.default.updateOne({ phone: req.body.phone, code: req.body.code }, { status: "used" });
                const body = {
                    name: req.body.name,
                    //email:req.body.email,
                    phone: req.body.phone,
                    authType: "phone",
                };
                const user = yield User_1.default.create(body);
                response_1.default.respondResult(res, user, http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                response_1.default.respondError(res, error, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Otp_1.default.findOne({
                    phone: req.body.phone,
                    code: req.body.code,
                    status: "unused",
                });
                console.log(data);
                if (!data) {
                    response_1.default.respondError(res, "otp not match", http_status_codes_1.StatusCodes.NOT_FOUND);
                }
                yield Otp_1.default.updateOne({ phone: req.body.phone, code: req.body.code }, { status: "used" });
                const user = yield User_1.default.findOne({
                    phone: req.body.phone,
                }).lean();
                console.log(user);
                if (!user) {
                    response_1.default.respondError(res, "user not found", http_status_codes_1.StatusCodes.NOT_FOUND);
                }
                const token = index_1.default.getToken({ _id: user === null || user === void 0 ? void 0 : user._id });
                response_1.default.respondResult(res, token, http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                response_1.default.respondError(res, error, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
    }
    loginWithGoogle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield google_1.Google.getAccountInfo(req.body.token);
                console.log(user);
                if (!user) {
                    response_1.default.respondError(res, "invalid token", http_status_codes_1.StatusCodes.NOT_FOUND);
                }
                // already login user
                yield User_1.default.create({
                    name: user.name ? user.name : user.email,
                    email: user.email,
                    authType: "google-auth",
                    isEmailVerified: true,
                });
                const data = yield User_1.default.findOne({ email: user.email });
                const token = index_1.default.getToken({ _id: data === null || data === void 0 ? void 0 : data._id });
                response_1.default.respondResult(res, token, http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                response_1.default.respondError(res, error, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
    }
    loginWithFacebook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            try {
                const userData = yield User_1.default.find({ userId: req.body.userId });
                // for new user login
                if (!userData) {
                    user = {
                        userId: req.body.userId,
                        username: req.body.userData.username,
                        profile: req.body.userData.profile,
                        phone: req.body.userData.phone || null,
                        email: req.body.userData.email || null,
                        authType: "facebook-auth",
                    };
                    const data = yield User_1.default.create(user);
                    const token = index_1.default.getToken({ _id: data._id });
                    response_1.default.respondResult(res, token, http_status_codes_1.StatusCodes.OK);
                }
                else {
                    const token = index_1.default.getToken({ _id: userData._id });
                    response_1.default.respondResult(res, token, http_status_codes_1.StatusCodes.OK);
                }
            }
            catch (error) {
                response_1.default.respondError(res, error, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
    }
}
exports.UserController = UserController;
