import express from "express";
import HttpResponse from "../utilities/response";
import { StatusCodes } from "http-status-codes";
import helper from "../helper/index";
import User from "../models/User";
import Otp from "../models/Otp";
import { Google, GoogleUserInfo } from "../Google/google";
import { isTypeOnlyExportDeclaration } from "typescript";
import { GoogleUser, UserType } from "./user.dto";

export class UserController {
  private async checkUserExist(phone: string) {
    console.log("phone ", phone);

    return User.findOne({ phone }).lean();
    // return data;
  }
  async create(req: express.Request, res: express.Response) {
    const userDoc: any = req.body;
    try {
      const admin = new User(userDoc);
      admin.password = helper.getHashed(userDoc.password);
      await admin.save();
      HttpResponse.respondStatus(
        res,
        "Admin created successfully",
        StatusCodes.OK
      );
    } catch (error) {
      HttpResponse.respondError(res, error, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  // async createOtp(phone: string) {
  //   try {
  //     const code = Math.floor(100000 + Math.random() * 900000);
  //     const data = await this.dbService.otp.upsert({
  //       where: {
  //         phone: phone,
  //       },
  //       update: {
  //         code: phone === '09123456789' ? '555555' : code.toString(),
  //         otpStatus: 'UNUSED',
  //       },
  //       create: {
  //         code: phone === '09123456789' ? '555555' : code.toString(),
  //         phone,
  //         otpStatus: 'UNUSED',
  //       },
  //     });
  //     return data;
  //   } catch (error) {
  //     throw new BadRequestException({
  //       message: 'Send otp fail',
  //       code: HttpStatus.BAD_REQUEST,
  //     });
  //   }
  // }

  async registerRequestOtp(req: express.Request, res: express.Response) {
    try {
      const code = Math.floor(100000 + Math.random() * 900000);
      console.log(code);
      console.log(req.body.phone);
      const data = await Otp.findOne({ phone: req.body.phone }).lean();
      let updateData = {
        code: req.body.phone === "09123456789" ? "555555" : code.toString(),
        status: "unused",
      };
      if (data) {
        Otp.updateOne({ phone: req.body.phone }, updateData);
      } else {
        await Otp.create({
          phone: req.body.phone,
          code: updateData.code,
          status: updateData.status,
        });
      }
      console.log("here");
      HttpResponse.respondResult(res, "otp sent", StatusCodes.OK);
    } catch (error) {
      HttpResponse.respondError(res, error, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async loginRequestOtp(req: express.Request, res: express.Response) {
    try {
      const data = await User.findOne({ phone: req.body.phone });
      console.log(data);

      if (!data) {
        res.send("User not found").status(400);
      }
      const code = Math.floor(100000 + Math.random() * 900000);
      const otp = await Otp.findOne({ phone: req.body.phone }).lean();
      let updateData = {
        code: req.body.phone === "09123456789" ? "555555" : code.toString(),
        status: "unused",
      };
      if (otp) {
        const data = await Otp.updateOne({ phone: req.body.phone }, updateData);
        console.log("555555");
        HttpResponse.respondResult(res, data, StatusCodes.OK);
      } else {
        const data = await Otp.create({
          phone: req.body.phone,
          code: updateData.code,
          status: updateData.status,
        });
        data.code = code;
        HttpResponse.respondResult(res, data, StatusCodes.OK);
      }
    } catch (error) {
      HttpResponse.respondError(res, error, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  private async checkOtp(phone: string, code: string) {
    console.log("hre");
    const data = await Otp.findOne({
      phone: phone,
      code: code,
      status: "unused",
    }).lean();
    console.log(data);
    return data;
  }

  private async updateOtpStatus(phone: string, code: string) {
    const data = await Otp.updateOne(
      { phone: phone, code: code },
      { status: "used" }
    );
    return data;
  }

  async register(req: express.Request, res: express.Response) {
    try {
      const data = await Otp.findOne({
        phone: req.body.phone,
        code: req.body.code,
        status: "unused",
      });
      if (!data) {
        HttpResponse.respondError(res, "otp not match", StatusCodes.NOT_FOUND);
      }
      await Otp.updateOne(
        { phone: req.body.phone, code: req.body.code },
        { status: "used" }
      );
      const body = {
        name: req.body.name,
        //email:req.body.email,
        phone: req.body.phone,
        authType: "phone",
      };
      const user = await User.create(body);
      HttpResponse.respondResult(res, user, StatusCodes.OK);
    } catch (error) {
      HttpResponse.respondError(res, error, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async login(req: express.Request, res: express.Response) {
    try {
      const data = await Otp.findOne({
        phone: req.body.phone,
        code: req.body.code,
        status: "unused",
      });
      console.log(data);
      if (!data) {
        HttpResponse.respondError(res, "otp not match", StatusCodes.NOT_FOUND);
      }
      await Otp.updateOne(
        { phone: req.body.phone, code: req.body.code },
        { status: "used" }
      );
      const user: UserType | null = await User.findOne({
        phone: req.body.phone,
      }).lean();
      console.log(user);
      if (!user) {
        HttpResponse.respondError(res, "user not found", StatusCodes.NOT_FOUND);
      }
      const token = helper.getToken({ _id: user?._id });
      HttpResponse.respondResult(res, token, StatusCodes.OK);
    } catch (error) {
      HttpResponse.respondError(res, error, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async loginWithGoogle(req: express.Request, res: express.Response) {
    try {
      const user: GoogleUserInfo = await Google.getAccountInfo(req.body.token);
      console.log(user);
      if (!user) {
        HttpResponse.respondError(res, "invalid token", StatusCodes.NOT_FOUND);
      }
      // already login user

      await User.create({
        name: user.name ? user.name : user.email,
        email: user.email,
        authType: "google-auth",
        isEmailVerified: true,
      });
      const data: UserType | null = await User.findOne({ email: user.email });
      const token = helper.getToken({ _id: data?._id });
      HttpResponse.respondResult(res, token, StatusCodes.OK);
    } catch (error) {
      HttpResponse.respondError(res, error, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async loginWithFacebook(req: express.Request, res: express.Response) {
    let user;
    try {
      const userData: any = await User.find({ userId: req.body.userId });
      // for new user login
      if (!userData) {
        user = {
          userId: req.body.userId,
          username: req.body.userData.username,
          profile: req.body.userData.profile,
          phone: req.body.userData.phone || null,
          email: req.body.userData.email || null,
          authType: "facebook-auth",
        };
        const data = await User.create(user);
        const token = helper.getToken({ _id: data._id });
        HttpResponse.respondResult(res, token, StatusCodes.OK);
      } else {
        const token = helper.getToken({ _id: userData._id });
        HttpResponse.respondResult(res, token, StatusCodes.OK);
      }
    } catch (error) {
      HttpResponse.respondError(res, error, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}
