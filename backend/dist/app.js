"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const core_db_1 = require("./core/core.db");
const server_1 = require("./server");
dotenv_1.default.config();
(0, core_db_1.connectDB)();
const app = (0, server_1.createServer)();
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
//# sourceMappingURL=app.js.map