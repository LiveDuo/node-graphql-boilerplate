import { UserModel } from '../../models/User/user'
import HttpStatusCodes from 'http-status-codes'
import { sign } from 'jsonwebtoken'
import { compare } from 'bcrypt'

import { getCachedThenQuery } from '../../services/caching/nodeCache'

const loginUser = async (req, res) => {

	const email = req.body.email
	const password = req.body.password
	const promise = UserModel.findOne({email: email})

	const result = await getCachedThenQuery('login-user-email-'+email, promise)
	if (!result) {
		return res.status(HttpStatusCodes.BAD_REQUEST).send({message: res.__('responses').user_not_found})
	}

	const isValid = await compare(password, result.password)
	if (!isValid) {
		return res.status(HttpStatusCodes.BAD_REQUEST).send({message: res.__('responses').password_invalid})
	}

	try {
		const token = sign({ id: result._id }, process.env.JWT_KEY)
		return res.status(HttpStatusCodes.OK).send({ jwt: token })
	} catch (error) {
		console.log(error.message)
		return res.status(HttpStatusCodes.BAD_REQUEST).send({ message: res.__('responses').invalid_request})
	}
}

export { loginUser }