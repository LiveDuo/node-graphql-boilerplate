import { UserModel } from '../../models/User/user'
import HttpStatusCodes from 'http-status-codes'
import { sign } from 'jsonwebtoken'
import { hash } from 'bcrypt'

const createUser = async (req, res) => {

	const user = {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email,
		gender: req.body.gender,
		language: req.body.language,
		age: req.body.age,
		favorites: req.body.favorites
	}

	try {
		user.password = await hash(req.body.password, 10)
	} catch (error) {
		console.log(error.message)
		return res.status(HttpStatusCodes.BAD_REQUEST).send({ message: res.__('responses').invalid_request})
	}

	const User = new UserModel(user)
	
	try {
		const result = await User.save()
		const token = sign({ id: result._id }, process.env.JWT_KEY)
		return res.status(HttpStatusCodes.OK).send({ jwt: token })
	} catch (error) {
		console.log(error.message)
		return res.status(HttpStatusCodes.BAD_REQUEST).send({ message: res.__('responses').invalid_request})
	}
}

export { createUser }