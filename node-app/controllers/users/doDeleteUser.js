import { UserModel } from '../../models/User/user'

import { verifyToken } from '../../services/authentication/verifyToken'

const doDeleteUser = async (_1, _2, context) => {

	let tokenDecoded
	try {
		tokenDecoded = await verifyToken(context.authHeader)
	} catch (error) {
			throw new Error('Authentication failed')
	}

	let userId = tokenDecoded.id
	let result
	try {
		result = await UserModel.findByIdAndDelete(userId)
	} catch (error) {
		console.log(error.message)
		throw new Error('Deleting error')
	}

	if (result) {
		return true
	} else {
		throw new Error('User not found')
	}
}

export { doDeleteUser }