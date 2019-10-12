import { UserModel } from '../../models/User/user'

import { getCachedThenQuery } from '../../services/caching/nodeCache'

const getUser = async (_, params) => {

	const userId = params.id
	const promise = UserModel.findById(userId)

	try {
		let result = await getCachedThenQuery('get-user-id-'-userId, promise)
		if (result) {
			result.password = undefined // maybe a bad idea
			return result
		} else {
			throw new Error('TODO')
		}
	} catch (error) {
		console.log(error.message)
		throw new Error('TODO')
	}
}

export { getUser }