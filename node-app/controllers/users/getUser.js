import { UserModel } from '../../models/User/user'

import { getCachedThenQuery } from '../../services/caching/nodeCache'

const getUser = async (_, params) => {

	const userId = params.id
	const promise = UserModel.findById(userId)

	let result
	try {
		result = await getCachedThenQuery('get-user-id-'-userId, promise)
	} catch (error) {
		console.log(error.message)
		throw new Error('User not found')
	}

	if (result) {
		result.password = undefined // maybe a bad idea
		return result
	} else {
		throw new Error('User not found')
	}
}

export { getUser }