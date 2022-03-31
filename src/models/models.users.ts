import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

/**
 * ! Define User schema
 * * octapf - 31/03/2022
 */
const userSchema = new mongoose.Schema({
	name: {
		firstName: { type: String, required: [true, 'Firstname is required'] },
		lastName: { type: String, required: [true, 'Lastname is required'] },
	},
	username: {
		type: String,
		required: [true, 'Username is required'],
		unique: true,
	},
	email: {
		type: String,
		required: [true, 'Email is required'],
		unique: true,
	},
	password: {
		type: String,
		required: [true, 'Password is required'],
		minlength: 6,
	},
})

userSchema.methods.hashPassword = async function (
	password: string
): Promise<void> {
	this.password = await bcrypt.hash(password, 10)
}

userSchema.methods.validatePassword = async function (
	password: string
): Promise<boolean> {
	const isValidate = await bcrypt.compare(password, this.password)
	return isValidate
}

// userSchema.pre('save', (user) => {
// 	this.hashPassword(user.password)
// })

export default mongoose.model('User', userSchema)
