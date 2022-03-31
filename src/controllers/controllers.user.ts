import express from 'express'
import User from '../models/models.users'
import { IUser } from '../interfaces/IUser'
import { JWTMiddleware } from '../middleware/middleware.jwt'

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
		const users = await User.find()

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
		} catch (error: any) {
			console.error(error)

			res.status(500).json({ Error: error.message })
		}
	}

	/**
	 * ! signin endpoint
	 * * octapf - 31/03/2022
	 * @param req
	 * @param res
	 */
	export const signin = (req: express.Request, res: express.Response) => {}

	/**
	 * ! signup endpoint
	 * * octapf - 20/03/2022
	 * @param req {express.Request}
	 * @param res {express.Response}
	 */
	export const signup = async (req: express.Request, res: express.Response) => {
		if (!req.body.username || !req.body.email || !req.body.password)
			return res.status(400).json({ msg: 'Invalid request' })
		try {
			//TODO check if exists in DB
			const user: IUser = new User({
				username: req.body.username,
				email: req.body.email,
				password: req.body.password,
			})

			if (!user) return res.status(400).json({ msg: 'Invalid user' })

			const token = JWTMiddleware._sign(user._id)

			const savedUser = await user.save()

			res.header('token', token).status(200).json(savedUser)
		} catch (error) {
			console.error(error)

			res.status(400).json({ Error: error })
		}
	}
}
