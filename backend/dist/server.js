"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const routes_user_1 = __importDefault(require("./routes/routes.user"));
const createServer = () => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use((0, morgan_1.default)('dev'));
    app.use('/api/', routes_user_1.default);
    app.set('port', 5000);
    return app;
};
exports.createServer = createServer;
//# sourceMappingURL=server.js.map