import express from 'express'
import { Endpoints } from '../common/base/base.endpoints'
import { userControllers } from '../controllers/controllers.user'
import { JWTMiddleware } from '../middleware/middleware.jwt'

const router: express.Router = express.Router()

router.route(Endpoints.home).get(userControllers.getHome)

router.route(Endpoints.signup).post(userControllers.signup)

router.route(Endpoints.signin).post(userControllers.signin)

router
	.route(Endpoints.users)
	.get(JWTMiddleware._verify, userControllers.getUsers)

router.route(Endpoints.validateUsername).post(userControllers.validateUsername)

router
	.route(Endpoints.userById)
	.get(JWTMiddleware._verify, userControllers.getUserById)

export default router
