import { pubsub } from '../../services/pubsub/apollo'

import { verifyToken } from '../../services/authentication/verifyToken'

// setInterval(() => {
// 	pubsub.publish('USER_UPDATED', { onUpdateUser: { first_name: Math.random().toString() }})
// }, 3000)

const onUpdateUser = {
	subscribe: async (_, params, context) => {
		console.log(params)

		let tokenDecoded
		try {
			tokenDecoded = await verifyToken(context.authHeader)
		} catch (error) {
				console.log(error.message)
				throw new Error('Authentication failed')
		}
		console.log(tokenDecoded)
		
		let iterator = pubsub.asyncIterator('USER_UPDATED')
		return iterator
	}
}

export { onUpdateUser }