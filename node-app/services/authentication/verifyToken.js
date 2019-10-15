import { verify } from 'jsonwebtoken'

const verifyToken = async (authHeader) => {
	let token = authHeader.split(' ')[1]
	let tokenDecoded = await verify(token, process.env.JWT_KEY)
	return tokenDecoded
}

export { verifyToken }