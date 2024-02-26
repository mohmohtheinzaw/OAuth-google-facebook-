import User from "../models/User";
import Otp from "../models/Otp";

const types = {
  User: "user",
  Otp: "otp",
};

class ModelFactory {
  static getModel(type: string) {
    switch (type) {
      case types.User:
        return User;
      case types.Otp:
        return Otp;
      default:
        throw "type not supported in factory";
    }
  }
}

export default ModelFactory;
