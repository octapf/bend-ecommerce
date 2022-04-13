import { Document } from 'mongoose'
import { IName } from './interface.name'

export interface IUser extends Document {
	name: IName
	username: string
	email: string
	password: string
	hashPassword(password: string): Promise<void>
	validatePassword(password: string): Promise<boolean>
}
