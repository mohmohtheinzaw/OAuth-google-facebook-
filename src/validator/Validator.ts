import express, { response } from "express";
import { StatusCodes } from "http-status-codes";
import HttpResponse from "../utilities/response.js";
class Validator {
  public static validateGet(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void {
    req.checkParams("id", "id must be mongoId").isMongoId();

    let validationErrors = req.validationErrors();
    if (validationErrors)
      HttpResponse.respondError(res, validationErrors, StatusCodes.BAD_REQUEST);
    else next();
  }

  public static validateDelete(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void {
    req.checkParams("id", "id must be mongoId").isMongoId();

    let validationErrors = req.validationErrors();
    if (validationErrors)
      HttpResponse.respondError(res, validationErrors, StatusCodes.BAD_REQUEST);
    else next();
  }

  public static validateGetWithRange(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void {
    req.checkQuery("skip", "skip should not be number").notEmpty().isInt();
    req.checkQuery("limit", "limit should not be number").notEmpty().isInt();

    let validationErrors = req.validationErrors();
    if (validationErrors)
      HttpResponse.respondError(res, validationErrors, StatusCodes.BAD_REQUEST);
    else next();
  }

  public static validateGetLatest(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void {
    req.checkQuery("count", "count should not be number").notEmpty().isInt();

    let validationErrors = req.validationErrors();
    if (validationErrors)
      HttpResponse.respondError(res, validationErrors, StatusCodes.BAD_REQUEST);
    else next();
  }

  public static validateGetWithDate(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void {
    req.checkQuery("date", "date should not be empty").notEmpty();

    let validationErrors = req.validationErrors();
    if (validationErrors)
      HttpResponse.respondError(res, validationErrors, StatusCodes.BAD_REQUEST);
    else next();
  }

  public static validateGetWithWeek(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void {
    req.checkQuery("date", "date should not be empty").notEmpty();

    let validationErrors = req.validationErrors();
    if (validationErrors)
      HttpResponse.respondError(res, validationErrors, StatusCodes.BAD_REQUEST);
    else next();
  }

  public static validateGetWithYear(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void {
    req.checkQuery("date", "date should not be empty").notEmpty();

    let validationErrors = req.validationErrors();
    if (validationErrors)
      HttpResponse.respondError(res, validationErrors, StatusCodes.BAD_REQUEST);
    else next();
  }

  public static validateSearch(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void {
    req.checkQuery("text", "text should not be empty").notEmpty();

    let validationErrors = req.validationErrors();
    if (validationErrors)
      HttpResponse.respondError(res, validationErrors, StatusCodes.BAD_REQUEST);
    else next();
  }
}

export default Validator;
