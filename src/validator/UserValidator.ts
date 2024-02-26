import { StatusCodes } from "http-status-codes";
import HttpResponse from "../utilities/response";
import Validator from "./Validator";
import express from "express";
export class UserValidator extends Validator {
  validateRequestOtp(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    console.log("here");
    req.checkBody("phone", "phone should not be empty").notEmpty();
    const validationErrors = req.validationErrors();
    if (validationErrors) {
      res.status(400).json(validationErrors);
    }
    next();
  }
  create(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.checkBody("name", "name should not be empty").notEmpty();
    req.checkBody("code", "code  should not be empty").notEmpty();
    req.checkBody("phone", "phone should not be empty").notEmpty();
    const validationErrors = req.validationErrors();
    if (validationErrors) {
      HttpResponse.respondError(res, validationErrors, StatusCodes.BAD_REQUEST);
    }
    console.log("ok");
    next();
  }

  update(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.checkParams("id", "id should be mongoId").isMongoId();
    req.checkBody("name", "name should not be empty").notEmpty();
    const validationErrors = req.validationErrors();
    if (validationErrors) {
      HttpResponse.respondError(res, validationErrors, StatusCodes.BAD_REQUEST);
    }
    next();
  }

  requestOtp(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.checkBody("phone", "phone should not be empty").notEmpty();
    const validationErrors = req.validationErrors();
    if (validationErrors) {
      HttpResponse.respondError(res, validationErrors, StatusCodes.BAD_REQUEST);
    }
    next();
  }

  register(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.checkBody("phone", "phone should not be empty").notEmpty();
    req.checkBody("name", "name should not be empty").notEmpty();
    req.checkBody("otp", "otp should not be empty").notEmpty();
    const validationErrors = req.validationErrors();
    if (validationErrors) {
      HttpResponse.respondError(res, validationErrors, StatusCodes.BAD_REQUEST);
    }
    next();
  }

  login(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.checkBody("phone", "phone should not be empty").notEmpty();
    req.checkBody("code", "code should not be empty").notEmpty();
    const validationErrors = req.validationErrors();
    if (validationErrors) {
      HttpResponse.respondError(res, validationErrors, StatusCodes.BAD_REQUEST);
    }
    next();
  }

  loginWithGoogle(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.checkBody("token", "token should not be empty").notEmpty();
    const validationErrors = req.validationErrors();
    if (validationErrors) {
      HttpResponse.respondError(res, validationErrors, StatusCodes.BAD_REQUEST);
    }
    next();
  }
}
