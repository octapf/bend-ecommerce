import User from '../models/models.users'

export namespace userEmailMiddleware {
	export const validateUserEmail = async (email: string): Promise<boolean> => {
		try {
			const user = await User.findOne({ email })

			if (user) return false

			return true
		} catch (error) {
			console.error(error)

			return false
		}
	}
}
