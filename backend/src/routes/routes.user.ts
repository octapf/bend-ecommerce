import express from 'express'
import { Endpoints } from '../common/base/static/base.userEndpoints'
import { userControllers } from '../controllers/controllers.user'
import { JWTMiddleware } from '../middleware/middleware.jwt'

const router: express.Router = express.Router()

router.route(Endpoints.home).get(userControllers.getHome)

/**
 * ! Post sign up
 * * octapf - 06/04/2022
 */
router.route(Endpoints.signup).post(userControllers.signup)

/**
 * ! Post sign in
 * * octapf - 06/04/2022
 */
router.route(Endpoints.signin).post(userControllers.signin)

/**
 * ! Get all users
 * * octapf - 06/04/2022
 */
router
	.route(Endpoints.users)
	.get(JWTMiddleware._verify, userControllers.getUsers)

/**
 * ! Post Validate username
 * * octapf - 06/04/2022
 */
router.route(Endpoints.validateUsername).post(userControllers.validateUsername)

/**
 * ! Post Validate user email
 * * octapf - 06/04/2022
 */
router
	.route(Endpoints.validateUserEmail)
	.post(userControllers.validateUserEmail)

/**
 * ! Get user by id
 * * octapf - 06/04/2022
 */
router
	.route(Endpoints.userById)
	.get(JWTMiddleware._verify, userControllers.getUserById)

/**
 * ! Delete user by id
 * * octapf - 06/04/2022
 */
router
	.route(Endpoints.userById)
	.delete(JWTMiddleware._verify, userControllers.deleteUserById)

/**
 * ! Update user firstname
 * * octapf - 06/04/2022
 */
router
	.route(Endpoints.userFirstName)
	.put(JWTMiddleware._verify, userControllers.updateUserFirstName)

/**
 * ! Update user lastname
 * * octapf - 06/04/2022
 */
router
	.route(Endpoints.userLastName)
	.put(JWTMiddleware._verify, userControllers.updateUserLastName)

/**
 * ! Update user password
 * * octapf - 06/04/2022
 */
router
	.route(Endpoints.userPassword)
	.put(JWTMiddleware._verify, userControllers.updateUserPassword)

/**
 * ! Update user email
 * * octapf - 06/04/2022
 */
router
	.route(Endpoints.userEmail)
	.put(JWTMiddleware._verify, userControllers.updateUserEmail)

/**
 * ! Update username
 * * octapf - 06/04/2022
 */
router
	.route(Endpoints.username)
	.put(JWTMiddleware._verify, userControllers.updateUsername)

export default router
