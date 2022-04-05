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
	.delete(JWTMiddleware._verify, userControllers.deleteUserById)

router
	.route(Endpoints.userFirstName)
	.put(JWTMiddleware._verify, userControllers.updateUserFirstName)

router
	.route(Endpoints.userLastName)
	.put(JWTMiddleware._verify, userControllers.updateUserLastName)

router
	.route(Endpoints.userPassword)
	.put(JWTMiddleware._verify, userControllers.updateUserPassword)

export default router
