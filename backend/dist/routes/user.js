"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const base_endpoints_1 = require("../common/base/base.endpoints");
const controllers_getUsers_1 = require("../controllers/controllers.getUsers");
const router = express_1.default.Router();
router.get(base_endpoints_1.Endpoints.home, controllers_getUsers_1.getUsers);
exports.default = router;
//# sourceMappingURL=user.js.map