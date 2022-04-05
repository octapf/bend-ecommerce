import express from 'express'
import User from '../models/models.users'
import { IUser } from '../models/interfaces/interface.user'
import { JWTMiddleware } from '../middleware/middleware.jwt'
import { usernameMiddleware } from '../middleware/middleware.username'
import { userDTO, userDTOManager } from '../models/dto/dto.user'

export namespace userControllers {
	/**
	 * ! getHome endpoint
	 * * octapf - 20/03/2022
	 * @param req {express.Request}
	 * @param res {express.Response}
	 */
	export const getHome = (req: express.Request, res: express.Response) => {
		res.send('This is the home of my App')
	}

	/**
	 * ! getUsers endpoint
	 * * octapf - 20/03/2022
	 * @param req {express.Request}
	 * @param res {express.Response}
	 */
	export const getUsers = async (
		req: express.Request,
		res: express.Response
	) => {
		const users = await User.find().select('-password')

		res.status(200).json(users)
	}

	/**
	 * ! Get user by id
	 * * octapf - 31/03/2022
	 * @param req
	 * @param res
	 */
	export const getUserById = async (
		req: express.Request,
		res: express.Response
	) => {
		const userId = req.params.id

		if (!userId) return res.status(400).json({ msg: 'Invalid request' })

		try {
			const user = await User.findById(userId)

			if (!user) return res.status(404).json({ msg: 'User not found' })

			res.status(200).json(user)
		} catch (error) {
			console.error(error)

			res.status(500).json({ msg: error })
		}
	}

	/**
	 * ! signin endpoint
	 * * octapf - 31/03/2022
	 * @param req
	 * @param res
	 */
	export const signin = async (req: express.Request, res: express.Response) => {
		try {
			if (
				!req.body.email ||
				!req.body.password ||
				Object.keys(req.body).length === 0
			)
				return res.status(400).json({ msg: 'Invalid request' })
			const { email, password } = req.body

			const user = await User.findOne({ email })

			if (!user) return res.status(404).json({ msg: 'User not found' })

			if (email !== user.email)
				return res.status(400).json({ msg: 'Invalid email or password' })

			const isValidate = await user.validatePassword(password)

			if (!isValidate)
				return res.status(400).json({ msg: 'Invalid email or password' })

			const token = JWTMiddleware._sign(user._id)

			res.header('token', token).status(200).json(user)
		} catch (error) {
			console.error(error)

			res.status(500).json({ msg: error })
		}
	}

	/**
	 * ! signup endpoint
	 * * octapf - 20/03/2022
	 * @param req {express.Request}
	 * @param res {express.Response}
	 */
	export const signup = async (req: express.Request, res: express.Response) => {
		if (
			!req.body.name ||
			!req.body.email ||
			!req.body.password ||
			Object.keys(req.body).length === 0
		)
			return res.status(400).json({ msg: 'Invalid request' })

		//TODO create regex
		if (req.body.password.length < 8)
			return res.status(400).json({ msg: 'Invalid password' })
		try {
			const user: IUser = new User({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password,
			})

			if (!user) return res.status(400).json({ msg: 'Invalid user' })

			const token = JWTMiddleware._sign(user._id)

			await user.hashPassword(user.password)

			const usernameAlternatives: string[] =
				await usernameMiddleware.generateUsername(
					1,
					user.name.firstName,
					user.name.lastName
				)

			user.username = usernameAlternatives[0]

			const savedUser = await user.save()

			res.header('token', token).status(200).json(savedUser)
		} catch (error) {
			console.error(error)

			res.status(500).json({ msg: error })
		}
	}

	/**
	 * ! Define validateUsername endpoint
	 * * octapf - 01/04/2022
	 * @param req
	 * @param res
	 */
	export const validateUsername = async (
		req: express.Request,
		res: express.Response
	) => {
		if (!req.body.username || Object.keys(req.body).length === 0)
			return res.status(400).json({ msg: 'Invalid request' })

		const username: string = req.body.username

		try {
			const userFound = await User.findOne({ username })

			if (!userFound)
				return res
					.status(200)
					.json({ msg: 'Username available', isAvailable: true })

			// TODO generate alternative usernames array with middleware

			const usernameAlternatives: string[] =
				await usernameMiddleware.generateUsername(3, username)

			return res.status(200).json({
				msg: 'Username already exists',
				isAvailable: false,
				usernameAlternatives,
			})
		} catch (error) {
			console.error(error)
			return res.status(500).json({ msg: error })
		}
	}

	/**
	 * ! Define delete user by id endpoint
	 * * octapf - 04/04/2022
	 * @param req
	 * @param res
	 */
	export const deleteUserById = async (
		req: express.Request,
		res: express.Response
	) => {
		try {
			const userId: string = req.params.id

			const userDeleted = await User.findByIdAndDelete(userId)

			if (!userDeleted) return res.status(404).json({ msg: 'User not found' })

			res.status(200).json(userDeleted)
		} catch (error) {
			console.error(error)
			res.status(500).json({ msg: error })
		}
	}

	/**
	 * ! Define update user firstName by id endpoint
	 * * octapf - 04/04/2022
	 * @param req
	 * @param res
	 */
	export const updateUserFirstName = async (
		req: express.Request,
		res: express.Response
	) => {
		try {
			if (
				!req.params.id ||
				Object.keys(req.body).length === 0 ||
				!req.body.firstName
			)
				return res.status(400).json({ msg: 'Invalid request' })

			const userId: string = req.params.id
			const { firstName } = req.body

			const user = await User.findById(userId)

			user.name.firstName = firstName

			const savedUser = await user.save()

			res.send(savedUser)
		} catch (error) {
			res.send(error)
		}
	}

	/**
	 * ! Define update user lastName by id endpoint
	 * * octapf - 04/04/2022
	 * @param req
	 * @param res
	 */
	export const updateUserLastName = async (
		req: express.Request,
		res: express.Response
	) => {
		try {
			if (
				!req.params.id ||
				Object.keys(req.body).length === 0 ||
				!req.body.lastName
			)
				return res.status(400).json({ msg: 'Invalid request' })

			const userId: string = req.params.id
			const { lastName } = req.body

			const user = await User.findById(userId)

			user.name.lastName = lastName

			const savedUser = await user.save()

			res.send(savedUser)
		} catch (error) {
			res.send(error)
		}
	}

	/**
	 * ! Define update user password by id endpoint
	 * * octapf - 04/04/2022
	 * @param req
	 * @param res
	 */
	export const updateUserPassword = async (
		req: express.Request,
		res: express.Response
	) => {
		try {
			if (
				!req.params.id ||
				Object.keys(req.body).length === 0 ||
				!req.body.password
			)
				return res.status(400).json({ msg: 'Invalid request' })

			//TODO create regex
			if (req.body.password.length < 8)
				return res.status(400).json({ msg: 'Invalid password' })

			const userId: string = req.params.id
			const { password } = req.body

			const user = await User.findById(userId)

			user.password = password

			await user.hashPassword(user.password)

			const savedUser = await user.save()

			res.send(savedUser)
		} catch (error) {
			res.send(error)
		}
	}
}
