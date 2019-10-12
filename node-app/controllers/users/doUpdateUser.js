import { UserModel } from '../../models/User/user'

const doUpdateUser = async (_, params) => {

	let imageUrl
  if (params.file && params.file.cloudStoragePublicUrl) {
    imageUrl = params.file.cloudStoragePublicUrl
  }
	
	//BUG overrides original data
	const user = {
			first_name: params.first_name,
			last_name: params.last_name,
			gender: params.gender,
			language: params.language,
			age: params.age,
			favorites: params.favorites,
			imageUrl: imageUrl
		}
		
		try {
			await UserModel.findByIdAndUpdate(params.id, user)
			
			return user
	} catch (error) {
		console.log(error.message)
		throw new Error('TODO')
	}
}

export { doUpdateUser }