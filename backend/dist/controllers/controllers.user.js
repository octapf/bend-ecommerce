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
exports.userControllers = void 0;
const models_users_1 = __importDefault(require("../models/models.users"));
const middleware_jwt_1 = require("../middleware/middleware.jwt");
const middleware_username_1 = require("../middleware/middleware.username");
const middleware_userEmail_1 = require("../middleware/middleware.userEmail");
var userControllers;
(function (userControllers) {
    /**
     * ! getHome endpoint
     * * octapf - 20/03/2022
     * @param req {express.Request}
     * @param res {express.Response}
     */
    userControllers.getHome = (req, res) => {
        res.send('This is the home of my App');
    };
    /**
     * ! getUsers endpoint
     * * octapf - 20/03/2022
     * @param req {express.Request}
     * @param res {express.Response}
     */
    userControllers.getUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
        const users = yield models_users_1.default.find().select('-password');
        res.status(200).json(users);
    });
    /**
     * ! Get user by id
     * * octapf - 31/03/2022
     * @param req
     * @param res
     */
    userControllers.getUserById = (req, res) => __awaiter(this, void 0, void 0, function* () {
        const userId = req.params.id;
        if (!userId)
            return res.status(400).json({ msg: 'Invalid request' });
        try {
            const user = yield models_users_1.default.findById(userId);
            if (!user)
                return res.status(404).json({ msg: 'User not found' });
            res.status(200).json(user);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ msg: error });
        }
    });
    /**
     * ! signin endpoint
     * * octapf - 31/03/2022
     * @param req
     * @param res
     */
    userControllers.signin = (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.body.email ||
                !req.body.password ||
                Object.keys(req.body).length === 0)
                return res.status(400).json({ msg: 'Invalid request' });
            const { email, password } = req.body;
            const user = yield models_users_1.default.findOne({ email });
            if (!user)
                return res.status(404).json({ msg: 'User not found' });
            if (email !== user.email)
                return res.status(400).json({ msg: 'Invalid email or password' });
            const isValidate = yield user.validatePassword(password);
            if (!isValidate)
                return res.status(400).json({ msg: 'Invalid email or password' });
            const token = middleware_jwt_1.JWTMiddleware._sign(user._id);
            res.header('token', token).status(200).json(user);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ msg: error });
        }
    });
    /**
     * ! signup endpoint
     * * octapf - 20/03/2022
     * @param req {express.Request}
     * @param res {express.Response}
     */
    userControllers.signup = (req, res) => __awaiter(this, void 0, void 0, function* () {
        if (!req.body.name ||
            !req.body.email ||
            !req.body.password ||
            Object.keys(req.body).length === 0)
            return res.status(400).json({ msg: 'Invalid request' });
        //TODO create regex
        if (req.body.password.length < 8)
            return res.status(400).json({ msg: 'Invalid password' });
        const isEmailAvailable = yield middleware_userEmail_1.userEmailMiddleware.validateUserEmail(req.body.email);
        if (!isEmailAvailable)
            return res.status(409).json({ msg: 'User email already exists' });
        try {
            const user = new models_users_1.default({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            });
            const token = middleware_jwt_1.JWTMiddleware._sign(user._id);
            yield user.hashPassword(user.password);
            const usernameAlternatives = yield middleware_username_1.usernameMiddleware.generateUsername(1, user.name.firstName, user.name.lastName);
            user.username = usernameAlternatives[0];
            const savedUser = yield user.save();
            res.header('token', token).status(200).json(savedUser);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ msg: error });
        }
    });
    /**
     * ! Define validateUsername endpoint
     * * octapf - 01/04/2022
     * @param req
     * @param res
     */
    userControllers.validateUsername = (req, res) => __awaiter(this, void 0, void 0, function* () {
        if (!req.body.username || Object.keys(req.body).length === 0)
            return res.status(400).json({ msg: 'Invalid request' });
        const username = req.body.username;
        try {
            const userFound = yield models_users_1.default.findOne({ username });
            if (!userFound)
                return res
                    .status(200)
                    .json({ msg: 'Username available', isAvailable: true });
            const usernameAlternatives = yield middleware_username_1.usernameMiddleware.generateUsername(3, username);
            return res.status(409).json({
                msg: 'Username already exists',
                isAvailable: false,
                usernameAlternatives,
            });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ msg: error });
        }
    });
    /**
     * ! Define validateUserEmail endpoint
     * * octapf - 06/04/2022
     * @param req
     * @param res
     */
    userControllers.validateUserEmail = (req, res) => __awaiter(this, void 0, void 0, function* () {
        if (!req.body.email || Object.keys(req.body).length === 0)
            return res.status(400).json({ msg: 'Invalid request' });
        const email = req.body.email;
        try {
            const userFound = yield models_users_1.default.findOne({ email });
            if (!userFound)
                return res
                    .status(200)
                    .json({ msg: 'Email available', isAvailable: true });
            return res.status(409).json({
                msg: 'Email already exists',
                isAvailable: false,
            });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ msg: error });
        }
    });
    /**
     * ! Define delete user by id endpoint
     * * octapf - 04/04/2022
     * @param req
     * @param res
     */
    userControllers.deleteUserById = (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.params.id;
            const userDeleted = yield models_users_1.default.findByIdAndDelete(userId);
            if (!userDeleted)
                return res.status(404).json({ msg: 'User not found' });
            res.status(200).json(userDeleted);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ msg: error });
        }
    });
    /**
     * ! Define update user firstName by id endpoint
     * * octapf - 04/04/2022
     * @param req
     * @param res
     */
    userControllers.updateUserFirstName = (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.params.id ||
                Object.keys(req.body).length === 0 ||
                !req.body.firstName)
                return res.status(400).json({ msg: 'Invalid request' });
            const userId = req.params.id;
            const { firstName } = req.body;
            const user = yield models_users_1.default.findById(userId);
            if (!user)
                return res.status(404).json({ msg: 'User not found' });
            user.name.firstName = firstName;
            const savedUser = yield user.save();
            res.send(savedUser);
        }
        catch (error) {
            res.send(error);
        }
    });
    /**
     * ! Define update user lastName by id endpoint
     * * octapf - 04/04/2022
     * @param req
     * @param res
     */
    userControllers.updateUserLastName = (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.params.id ||
                Object.keys(req.body).length === 0 ||
                !req.body.lastName)
                return res.status(400).json({ msg: 'Invalid request' });
            const userId = req.params.id;
            const { lastName } = req.body;
            const user = yield models_users_1.default.findById(userId);
            if (!user)
                return res.status(404).json({ msg: 'User not found' });
            user.name.lastName = lastName;
            const savedUser = yield user.save();
            res.json(savedUser);
        }
        catch (error) {
            res.status(500).json({ msg: error });
        }
    });
    /**
     * ! Define update user password by id endpoint
     * * octapf - 04/04/2022
     * @param req
     * @param res
     */
    userControllers.updateUserPassword = (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.params.id ||
                Object.keys(req.body).length === 0 ||
                !req.body.password)
                return res.status(400).json({ msg: 'Invalid request' });
            //TODO create regex
            if (req.body.password.length < 8)
                return res.status(400).json({ msg: 'Invalid password' });
            const userId = req.params.id;
            const { password } = req.body;
            const user = yield models_users_1.default.findById(userId);
            if (!user)
                return res.status(404).json({ msg: 'User not found' });
            user.password = password;
            yield user.hashPassword(user.password);
            const savedUser = yield user.save();
            res.json(savedUser);
        }
        catch (error) {
            res.status(500).json({ msg: error });
        }
    });
    /**
     * ! Define update user email by id endpoint
     * * octapf - 04/04/2022
     * @param req
     * @param res
     */
    userControllers.updateUserEmail = (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.params.id ||
                Object.keys(req.body).length === 0 ||
                !req.body.email)
                return res.status(400).json({ msg: 'Invalid request' });
            const userId = req.params.id;
            const { email } = req.body;
            const user = yield models_users_1.default.findById(userId);
            if (!user)
                return res.status(404).json({ msg: 'User not found' });
            const isEmailAvailable = yield middleware_userEmail_1.userEmailMiddleware.validateUserEmail(email);
            if (!isEmailAvailable)
                return res.status(409).json({ msg: 'User email already exists' });
            user.email = email;
            const savedUser = yield user.save();
            res.json(savedUser);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ msg: error });
        }
    });
    /**
     * ! Define update username by id endpoint
     * * octapf - 04/04/2022
     * @param req
     * @param res
     */
    userControllers.updateUsername = (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.params.id ||
                Object.keys(req.body).length === 0 ||
                !req.body.username)
                return res.status(400).json({ msg: 'Invalid request' });
            const userId = req.params.id;
            const { username } = req.body;
            const user = yield models_users_1.default.findById(userId);
            if (!user)
                return res.status(404).json({ msg: 'User not found' });
            const isUsernameAvailable = yield middleware_username_1.usernameMiddleware.validateUsername(username);
            if (!isUsernameAvailable)
                return res.status(409).json({ msg: 'Username already exists' });
            user.username = username;
            const savedUser = yield user.save();
            res.json(savedUser);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ msg: error });
        }
    });
})(userControllers = exports.userControllers || (exports.userControllers = {}));
//# sourceMappingURL=controllers.user.js.map