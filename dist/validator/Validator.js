"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const response_js_1 = __importDefault(require("../utilities/response.js"));
class Validator {
    static validateGet(req, res, next) {
        req.checkParams("id", "id must be mongoId").isMongoId();
        let validationErrors = req.validationErrors();
        if (validationErrors)
            response_js_1.default.respondError(res, validationErrors, http_status_codes_1.StatusCodes.BAD_REQUEST);
        else
            next();
    }
    static validateDelete(req, res, next) {
        req.checkParams("id", "id must be mongoId").isMongoId();
        let validationErrors = req.validationErrors();
        if (validationErrors)
            response_js_1.default.respondError(res, validationErrors, http_status_codes_1.StatusCodes.BAD_REQUEST);
        else
            next();
    }
    static validateGetWithRange(req, res, next) {
        req.checkQuery("skip", "skip should not be number").notEmpty().isInt();
        req.checkQuery("limit", "limit should not be number").notEmpty().isInt();
        let validationErrors = req.validationErrors();
        if (validationErrors)
            response_js_1.default.respondError(res, validationErrors, http_status_codes_1.StatusCodes.BAD_REQUEST);
        else
            next();
    }
    static validateGetLatest(req, res, next) {
        req.checkQuery("count", "count should not be number").notEmpty().isInt();
        let validationErrors = req.validationErrors();
        if (validationErrors)
            response_js_1.default.respondError(res, validationErrors, http_status_codes_1.StatusCodes.BAD_REQUEST);
        else
            next();
    }
    static validateGetWithDate(req, res, next) {
        req.checkQuery("date", "date should not be empty").notEmpty();
        let validationErrors = req.validationErrors();
        if (validationErrors)
            response_js_1.default.respondError(res, validationErrors, http_status_codes_1.StatusCodes.BAD_REQUEST);
        else
            next();
    }
    static validateGetWithWeek(req, res, next) {
        req.checkQuery("date", "date should not be empty").notEmpty();
        let validationErrors = req.validationErrors();
        if (validationErrors)
            response_js_1.default.respondError(res, validationErrors, http_status_codes_1.StatusCodes.BAD_REQUEST);
        else
            next();
    }
    static validateGetWithYear(req, res, next) {
        req.checkQuery("date", "date should not be empty").notEmpty();
        let validationErrors = req.validationErrors();
        if (validationErrors)
            response_js_1.default.respondError(res, validationErrors, http_status_codes_1.StatusCodes.BAD_REQUEST);
        else
            next();
    }
    static validateSearch(req, res, next) {
        req.checkQuery("text", "text should not be empty").notEmpty();
        let validationErrors = req.validationErrors();
        if (validationErrors)
            response_js_1.default.respondError(res, validationErrors, http_status_codes_1.StatusCodes.BAD_REQUEST);
        else
            next();
    }
}
exports.default = Validator;
