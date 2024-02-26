"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const Otp_1 = __importDefault(require("../models/Otp"));
const types = {
    User: "user",
    Otp: "otp",
};
class ModelFactory {
    static getModel(type) {
        switch (type) {
            case types.User:
                return User_1.default;
            case types.Otp:
                return Otp_1.default;
            default:
                throw "type not supported in factory";
        }
    }
}
exports.default = ModelFactory;
