import { Schema, model } from "mongoose";

export enum UserAuthType {
  Email = "email",
  GoogleAuth = "google-auth",
  FacebookAuth = "facebook-auth",
  Phone = "phone",
}

export const userSchema: Schema = new Schema(
  {
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
  },
  {
    timestamps: true,
  }
);
const User = model("User", userSchema);

export default User;
