"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpSchema = exports.OtpStatus = void 0;
const mongoose_1 = require("mongoose");
var OtpStatus;
(function (OtpStatus) {
    OtpStatus["Used"] = "used";
    OtpStatus["UnUsed"] = "unused";
})(OtpStatus || (exports.OtpStatus = OtpStatus = {}));
exports.otpSchema = new mongoose_1.Schema({
    phone: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(OtpStatus),
        required: true,
        default: OtpStatus.UnUsed,
    },
}, {
    timestamps: true,
});
const Otp = (0, mongoose_1.model)("Otp", exports.otpSchema);
exports.default = Otp;
