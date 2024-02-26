import { model, Schema } from "mongoose";

export enum OtpStatus {
  Used = "used",
  UnUsed = "unused",
}
export const otpSchema: Schema = new Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

const Otp = model("Otp", otpSchema);

export default Otp;
