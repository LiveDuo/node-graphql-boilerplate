import { UserModel } from '../../models/User/user'
import { sign } from 'jsonwebtoken'
import { hash } from 'bcrypt'

const doAddUser = async (_, params) => {

	const user = {
		first_name: params.first_name,
		last_name: params.last_name,
		email: params.email,
		gender: params.gender,
		language: params.language,
		age: params.age,
		favorites: params.favorites
	}

	try {
		user.password = await hash(params.password, 10)
	} catch (error) {
		console.log(error.message)
		throw new Error('TODO')
	}

	const User = new UserModel(user)
	
	try {
		const result = await User.save()
		const token = sign({ id: result._id }, process.env.JWT_KEY)
		return { jwt: token, ...result._doc }
	} catch (error) {
		console.log(error.message)
		throw new Error('TODO')
	}
}

export { doAddUser }