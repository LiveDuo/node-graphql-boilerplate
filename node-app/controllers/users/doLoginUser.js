import { UserModel } from '../../models/User/user'
import { sign } from 'jsonwebtoken'
import { compare } from 'bcrypt'

import { getCachedThenQuery } from '../../services/caching/nodeCache'

const doLoginUser = async (_, params) => {

	const promise = UserModel.findOne({email: params.email})

	const result = await getCachedThenQuery('login-user-email-'+params.email, promise)
	if (!result) {
		throw new Error('User not found')
	}

	const isValid = await compare(params.password, result.password)
	if (!isValid) {
		throw new Error('Password is invalid')
	}

	try {
		const token = sign({ id: result._id }, process.env.JWT_KEY)
		return { jwt: token, ...result._doc }
	} catch (error) {
		console.log(error.message)
		throw new Error('Token hashing error')
	}
}

export { doLoginUser }