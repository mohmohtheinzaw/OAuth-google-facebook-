import ctypto from "crypto";
import jwt from "jsonwebtoken";

function getHashed(payload: string): string {
  return ctypto.createHash("sha1").update(payload).digest("hex");
}

function getToken(payload: Object): string {
  return jwt.sign(payload, "token_secret");
}

function getRandomTokenString(bytes: number = 40): string {
  return ctypto.randomBytes(bytes).toString("hex");
}

export default {
  getHashed,
  getToken,
  getRandomTokenString,
};
