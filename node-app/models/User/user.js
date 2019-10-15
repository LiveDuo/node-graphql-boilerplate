import mongoose from 'mongoose'
import { EmailSchema } from '../Email/email'

const Schema = mongoose.Schema

const UserSchema = new Schema({
	first_name: { type: String, required: true, max: 50 },
	last_name: { type: String, required: true, max: 50 },
	password: { type: String, required: true },
	email: EmailSchema,
	image_urls: [{ type: String }]
})

export const UserModel = mongoose.model('User', UserSchema)