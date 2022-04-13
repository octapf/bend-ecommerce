"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usernameMiddleware = void 0;
const models_users_1 = __importDefault(require("../models/models.users"));
var usernameMiddleware;
(function (usernameMiddleware) {
    usernameMiddleware.generateUsername = (quantity, firstInput, secondInput) => __awaiter(this, void 0, void 0, function* () {
        const usernameAlternatives = [];
        for (let i = 0; i < quantity; i++) {
            const randomNumber = Math.floor(Math.random() * 1000000)
                .toString()
                .slice(0, 6);
            const username = secondInput
                ? firstInput.toLowerCase() + secondInput.toLowerCase() + randomNumber
                : firstInput.toLowerCase() + randomNumber;
            const isAvailable = yield usernameMiddleware.validateUsername(username);
            if (isAvailable)
                usernameAlternatives.push(username);
            if (!isAvailable)
                i--;
        }
        return usernameAlternatives;
    });
    usernameMiddleware.validateUsername = (username) => __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield models_users_1.default.findOne({ username });
            if (user)
                return false;
            return true;
        }
        catch (error) {
            console.error(error);
            return false;
        }
    });
})(usernameMiddleware = exports.usernameMiddleware || (exports.usernameMiddleware = {}));
//# sourceMappingURL=middleware.user.js.map