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
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
/**
 * ! Define User schema
 * * octapf - 31/03/2022
 */
const userSchema = new mongoose_1.default.Schema({
    name: {
        firstName: { type: String, required: [true, 'Firstname is required'] },
        lastName: { type: String, required: [true, 'Lastname is required'] },
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6,
    },
}, { timestamps: true });
userSchema.methods.hashPassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        this.password = yield bcryptjs_1.default.hash(password, 10);
    });
};
userSchema.methods.validatePassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        const isValidate = yield bcryptjs_1.default.compare(password, this.password);
        return isValidate;
    });
};
// userSchema.pre('save', (user) => {
// 	this.hashPassword(user.password)
// })
exports.default = mongoose_1.default.model('User', userSchema);
//# sourceMappingURL=models.users.js.map