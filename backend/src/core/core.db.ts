import mongoose from 'mongoose'

export const connectDB = async () => {
	try {
		await mongoose.connect('mongodb://localhost/test2')

		console.log('Connected to DB')
	} catch (error) {
		console.error(error)
	}
}
