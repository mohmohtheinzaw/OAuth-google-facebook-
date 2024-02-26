import { ObjectId } from "mongoose";

export type UserType = {
  _id: ObjectId;
  name: String;
  phone: String;
  authType: String;
  isEmailVerified: Boolean;
  isDeleted: Boolean;
  createdAt: Date;
  updatedAt: Date;
  _v: Number;
};

export type GoogleUser = {
  id: String;
  email: String;
  verified_email: Boolean;
  picture: String;
};
