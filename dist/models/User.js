"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = exports.UserAuthType = void 0;
const mongoose_1 = require("mongoose");
var UserAuthType;
(function (UserAuthType) {
    UserAuthType["Email"] = "email";
    UserAuthType["GoogleAuth"] = "google-auth";
    UserAuthType["FacebookAuth"] = "facebook-auth";
    UserAuthType["Phone"] = "phone";
})(UserAuthType || (exports.UserAuthType = UserAuthType = {}));
exports.userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
    authType: {
        type: String,
        enum: Object.values(UserAuthType),
        required: true,
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
const User = (0, mongoose_1.model)("User", exports.userSchema);
exports.default = User;
