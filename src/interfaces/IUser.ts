import { Document } from 'mongoose'
import { Name } from './interface.name'

export interface IUser extends Document {
	name: Name
	username: string
	email: string
	password: string
	hashPassword(password: string): Promise<void>
	validatePassword(password: string): Promise<boolean>
}
