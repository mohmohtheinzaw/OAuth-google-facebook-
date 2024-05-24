"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidator = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = __importDefault(require("../utilities/response"));
const Validator_1 = __importDefault(require("./Validator"));
class UserValidator extends Validator_1.default {
    validateRequestOtp(req, res, next) {
        console.log("here");
        req.checkBody("phone", "phone should not be empty").notEmpty();
        const validationErrors = req.validationErrors();
        if (validationErrors) {
            res.status(400).json(validationErrors);
        }
        next();
    }
    create(req, res, next) {
        req.checkBody("name", "name should not be empty").notEmpty();
        req.checkBody("code", "code  should not be empty").notEmpty();
        req.checkBody("phone", "phone should not be empty").notEmpty();
        const validationErrors = req.validationErrors();
        if (validationErrors) {
            response_1.default.respondError(res, validationErrors, http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        console.log("ok");
        next();
    }
    update(req, res, next) {
        req.checkParams("id", "id should be mongoId").isMongoId();
        req.checkBody("name", "name should not be empty").notEmpty();
        const validationErrors = req.validationErrors();
        if (validationErrors) {
            response_1.default.respondError(res, validationErrors, http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        next();
    }
    requestOtp(req, res, next) {
        req.checkBody("phone", "phone should not be empty").notEmpty();
        const validationErrors = req.validationErrors();
        if (validationErrors) {
            response_1.default.respondError(res, validationErrors, http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        next();
    }
    register(req, res, next) {
        req.checkBody("phone", "phone should not be empty").notEmpty();
        req.checkBody("name", "name should not be empty").notEmpty();
        req.checkBody("otp", "otp should not be empty").notEmpty();
        const validationErrors = req.validationErrors();
        if (validationErrors) {
            response_1.default.respondError(res, validationErrors, http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        next();
    }
    login(req, res, next) {
        req.checkBody("phone", "phone should not be empty").notEmpty();
        req.checkBody("code", "code should not be empty").notEmpty();
        const validationErrors = req.validationErrors();
        if (validationErrors) {
            response_1.default.respondError(res, validationErrors, http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        next();
    }
    loginWithGoogle(req, res, next) {
        req.checkBody("token", "token should not be empty").notEmpty();
        const validationErrors = req.validationErrors();
        if (validationErrors) {
            response_1.default.respondError(res, validationErrors, http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        next();
    }
    loginWithFacebook(req, res, next) {
        req.checkBody("userId", "userId should not be empty").notEmpty();
        req.checkBody("userDate", "user data should not be empty").notEmpty();
        const validationErrors = req.validationErrors();
        if (validationErrors) {
            response_1.default.respondError(res, validationErrors, http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        next();
    }
}
exports.UserValidator = UserValidator;
