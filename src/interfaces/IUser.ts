import { Document } from 'mongoose'

export interface IUser extends Document {
	username: string
	email: string
	password: string
	hashPassword(password: string): Promise<void>
	validatePassword(password: string): Promise<boolean>
}
