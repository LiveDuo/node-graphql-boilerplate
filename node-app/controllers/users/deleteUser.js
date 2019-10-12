import { UserModel } from '../../models/User/user'

const deleteUser = async (_, params) => {
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

export { deleteUser }