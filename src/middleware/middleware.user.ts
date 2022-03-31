import User from '../models/models.users'

export namespace userMiddleware {
	export const generateUsernameMiddleware = (
		quantity: number,
		firstInput: string,
		secondInput?: string
	) => {}
	export const validateUserMiddleware = async (
		user: Object
	): Promise<boolean> => {
		try {
			const userFound = await User.findOne(user)
			console.log('MDW', userFound)

			if (userFound) {
				return false
			}
			return true
		} catch (error) {
			console.error(error)
			return false
		}
	}
}
