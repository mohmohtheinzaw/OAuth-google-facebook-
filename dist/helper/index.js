"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function getHashed(payload) {
    return crypto_1.default.createHash("sha1").update(payload).digest("hex");
}
function getToken(payload) {
    return jsonwebtoken_1.default.sign(payload, "token_secret");
}
function getRandomTokenString(bytes = 40) {
    return crypto_1.default.randomBytes(bytes).toString("hex");
}
exports.default = {
    getHashed,
    getToken,
    getRandomTokenString,
};
