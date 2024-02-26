"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
class HttpResponse {
    static respondStatus(res, message, status = http_status_codes_1.StatusCodes.OK) {
        res.status(status).json({
            message,
            success: true,
        });
    }
    static respondResult(res, data, status = http_status_codes_1.StatusCodes.OK) {
        res.status(status).json({
            data,
            success: true,
        });
    }
    static respondPagination(res, data, pagination, status = http_status_codes_1.StatusCodes.OK) {
        res.status(status).json({
            data,
            pagination,
            success: true,
        });
    }
    static respondError(res, error = null, status = http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR) {
        if (!error)
            error = (0, http_status_codes_1.getReasonPhrase)(status);
        res.status(status).json({
            error,
            success: false,
        });
    }
}
exports.default = HttpResponse;
