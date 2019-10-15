import { UserModel } from '../../models/User/user'
import { sign } from 'jsonwebtoken'
import { hash } from 'bcrypt'

const doAddUser = async (_, params) => {

	let password
	try {
		password = await hash(params.password, 10)
	} catch (error) {
		console.log(error.message)
		throw new Error('Password hashing error')
	}

	const User = new UserModel({...params, password})
	
	let result
	try {
		result = await User.save()
	} catch (error) {
		console.log(error.message)
		throw new Error('User saving error')
	}

	let token
	try {
		token = sign({ id: result._id }, process.env.JWT_KEY)
	} catch (error) {
		console.log(error.message)
		throw new Error('Token signing error')
	}

	return { jwt: token, ...result._doc }
	
}

export { doAddUser }