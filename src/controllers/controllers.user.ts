import express from 'express'
import User from '../models/models.users'
import { IUser } from '../interfaces/IUser'
import { JWTMiddleware } from '../middleware/middleware.jwt'
import { userMiddleware } from '../middleware/middleware.user'

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
		if (!req.body.userId)
			return res.status(400).json({ msg: 'Invalid request' })

		const { userId } = req.body

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
			if (!req.body.email || !req.body.password)
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
		if (!req.body.name || !req.body.email || !req.body.password)
			return res.status(400).json({ msg: 'Invalid request' })
		try {
			//TODO check if exists in DB
			const user: IUser = new User({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password,
			})

			if (!user) return res.status(400).json({ msg: 'Invalid user' })

			const token = JWTMiddleware._sign(user._id)

			await user.hashPassword(user.password)

			const savedUser = await user.save()

			res.header('token', token).status(200).json(savedUser)
		} catch (error) {
			console.error(error)

			res.status(500).json({ msg: error })
		}
	}
}
