import { UserModel } from '../../models/User/user'

import { verifyToken } from '../../services/authentication/verifyToken'

import { uploadImageResizedToFolderpath } from '../../services/upload/uploadImages'

const doUpdateUserAsync = async (userId, file) => {
	let mediaUrls = await uploadImageResizedToFolderpath(file, 'update-multiple')
	let result = await UserModel.findByIdAndUpdate(userId, {mediaUrls: mediaUrls})
	console.log(`updated ${result._id} async`)
}

const doUpdateUser = async (_, params, context) => {

	let tokenDecoded
	try {
		tokenDecoded = await verifyToken(context.authHeader)
	} catch (error) {
			throw new Error('Authentication failed')
	}
	
	try {
		if (params.isSync) {
			let mediaUrls = await uploadImageResizedToFolderpath(params.file, 'update-multiple')
			params.image_urls = mediaUrls
		} else {
			doUpdateUserAsync(tokenDecoded.id, params.file)
		}
	} catch (error) {
		console.log(error.message)
		throw new Error('Image upload failed')
	}
	
	try {
		let result = await UserModel.findByIdAndUpdate(tokenDecoded.id, params)
		return {...result._doc}
	} catch (error) {
		console.log(error.message)
		throw new Error('User not found')
	}
}

export { doUpdateUser }