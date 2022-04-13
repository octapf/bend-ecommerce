"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var JWTMiddleware;
(function (JWTMiddleware) {
    JWTMiddleware._sign = (userId) => {
        const token = jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET);
        return token;
    };
    JWTMiddleware._verify = (req, res, next) => {
        const token = req.header('token');
        const verification = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, {
            complete: true,
        });
        req.userId = verification.payload.userId;
        next();
    };
})(JWTMiddleware = exports.JWTMiddleware || (exports.JWTMiddleware = {}));
//# sourceMappingURL=middleware.jwt.js.map