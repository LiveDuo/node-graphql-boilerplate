import { UserModel } from '../../models/User/user'
import HttpStatusCodes from 'http-status-codes'

const deleteUser = async (req, res) => {
	try {
		const result = await UserModel.findByIdAndDelete(req.userId)
		if (result) {
			return res.status(HttpStatusCodes.OK).end()
		} else {
			return res.status(HttpStatusCodes.BAD_REQUEST).send({message: res.__('responses').something_went_wrong})
		}
	} catch (error) {
		console.log(error.message)
		return res.status(HttpStatusCodes.BAD_REQUEST).send({message: res.__('responses').something_went_wrong})
	}
}

export { deleteUser }