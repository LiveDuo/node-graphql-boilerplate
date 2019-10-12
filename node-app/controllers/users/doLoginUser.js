import { UserModel } from '../../models/User/user'
import { sign } from 'jsonwebtoken'
import { compare } from 'bcrypt'

import { getCachedThenQuery } from '../../services/caching/nodeCache'

const doLoginUser = async (_, params) => {

	const email = params.email
	const password = params.password
	const promise = UserModel.findOne({email: email})

	const result = await getCachedThenQuery('login-user-email-'+email, promise)
	if (!result) {
		throw new Error('TODO')
	}

	const isValid = await compare(password, result.password)
	if (!isValid) {
		throw new Error('TODO')
	}

	try {
		const token = sign({ id: result._id }, process.env.JWT_KEY)
		return { jwt: token, ...result._doc }
	} catch (error) {
		console.log(error.message)
		throw new Error('TODO')
	}
}

export { doLoginUser }