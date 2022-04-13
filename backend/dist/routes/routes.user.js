"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const base_userEndpoints_1 = require("../common/base/static/base.userEndpoints");
const controllers_user_1 = require("../controllers/controllers.user");
const middleware_jwt_1 = require("../middleware/middleware.jwt");
const router = express_1.default.Router();
router.route(base_userEndpoints_1.Endpoints.home).get(controllers_user_1.userControllers.getHome);
/**
 * ! Post sign up
 * * octapf - 06/04/2022
 */
router.route(base_userEndpoints_1.Endpoints.signup).post(controllers_user_1.userControllers.signup);
/**
 * ! Post sign in
 * * octapf - 06/04/2022
 */
router.route(base_userEndpoints_1.Endpoints.signin).post(controllers_user_1.userControllers.signin);
/**
 * ! Get all users
 * * octapf - 06/04/2022
 */
router
    .route(base_userEndpoints_1.Endpoints.users)
    .get(middleware_jwt_1.JWTMiddleware._verify, controllers_user_1.userControllers.getUsers);
/**
 * ! Post Validate username
 * * octapf - 06/04/2022
 */
router.route(base_userEndpoints_1.Endpoints.validateUsername).post(controllers_user_1.userControllers.validateUsername);
/**
 * ! Post Validate user email
 * * octapf - 06/04/2022
 */
router
    .route(base_userEndpoints_1.Endpoints.validateUserEmail)
    .post(controllers_user_1.userControllers.validateUserEmail);
/**
 * ! Get user by id
 * * octapf - 06/04/2022
 */
router
    .route(base_userEndpoints_1.Endpoints.userById)
    .get(middleware_jwt_1.JWTMiddleware._verify, controllers_user_1.userControllers.getUserById);
/**
 * ! Delete user by id
 * * octapf - 06/04/2022
 */
router
    .route(base_userEndpoints_1.Endpoints.userById)
    .delete(middleware_jwt_1.JWTMiddleware._verify, controllers_user_1.userControllers.deleteUserById);
/**
 * ! Update user firstname
 * * octapf - 06/04/2022
 */
router
    .route(base_userEndpoints_1.Endpoints.userFirstName)
    .put(middleware_jwt_1.JWTMiddleware._verify, controllers_user_1.userControllers.updateUserFirstName);
/**
 * ! Update user lastname
 * * octapf - 06/04/2022
 */
router
    .route(base_userEndpoints_1.Endpoints.userLastName)
    .put(middleware_jwt_1.JWTMiddleware._verify, controllers_user_1.userControllers.updateUserLastName);
/**
 * ! Update user password
 * * octapf - 06/04/2022
 */
router
    .route(base_userEndpoints_1.Endpoints.userPassword)
    .put(middleware_jwt_1.JWTMiddleware._verify, controllers_user_1.userControllers.updateUserPassword);
/**
 * ! Update user email
 * * octapf - 06/04/2022
 */
router
    .route(base_userEndpoints_1.Endpoints.userEmail)
    .put(middleware_jwt_1.JWTMiddleware._verify, controllers_user_1.userControllers.updateUserEmail);
/**
 * ! Update username
 * * octapf - 06/04/2022
 */
router
    .route(base_userEndpoints_1.Endpoints.username)
    .put(middleware_jwt_1.JWTMiddleware._verify, controllers_user_1.userControllers.updateUsername);
exports.default = router;
//# sourceMappingURL=routes.user.js.map