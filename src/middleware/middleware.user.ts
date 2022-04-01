import User from '../models/models.users'

export namespace userMiddleware {
	export const generateUsernameMiddleware = async (
		quantity: number,
		firstInput: string,
		secondInput?: string
	): Promise<string[]> => {
		const usernameAlternatives: string[] = []

		for (let i = 0; i < quantity; i++) {
			const randomNumber = (Math.random() * 1000000).toString().slice(0, 6)

			const username = secondInput
				? firstInput.toLowerCase() + secondInput.toLowerCase() + randomNumber
				: firstInput.toLowerCase() + randomNumber

			const isAvailable = await validateUsernameMiddleware(username)

			if (isAvailable) usernameAlternatives.push(username)
			if (!isAvailable) i--
		}

		return usernameAlternatives
	}
	export const validateUsernameMiddleware = async (
		username: string
	): Promise<boolean> => {
		try {
			const user = await User.findOne({ username })

			if (user) return false
			return true
		} catch (error) {
			console.error(error)

			return false
		}
	}
}
