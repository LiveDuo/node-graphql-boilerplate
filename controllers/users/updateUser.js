import { UserModel } from '../../models/User/user'
import HttpStatusCodes from 'http-status-codes'

const updateUser = async (req, res) => {

	let imageUrl
  if (req.file && req.file.cloudStoragePublicUrl) {
    imageUrl = req.file.cloudStoragePublicUrl
  }
	
	//BUG overrides original data
	const user = {
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			gender: req.body.gender,
			language: req.body.language,
			age: req.body.age,
			favorites: req.body.favorites,
			imageUrl: imageUrl
		}
		
		try {
			await UserModel.findByIdAndUpdate(req.userId, user)
			
			return res.status(HttpStatusCodes.OK).send(user)
	} catch (error) {
		console.log(error.message)
		return res.status(HttpStatusCodes.BAD_REQUEST).send({ message: res.__('responses').invalid_request})
	}
}

export { updateUser }