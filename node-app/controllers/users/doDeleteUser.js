import { UserModel } from '../../models/User/user'

const doDeleteUser = async (_, params, context) => {
	console.log(params)
	console.log(context)
	try {
		const result = await UserModel.findByIdAndDelete(params.userId)
		if (result) {
			return {}
		} else {
			throw new Error('TODO')
		}
	} catch (error) {
		console.log(error.message)
		throw new Error('TODO')
	}
}

export { doDeleteUser }