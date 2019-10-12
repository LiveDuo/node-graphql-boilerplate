import HttpStatusCodes from 'http-status-codes'
import { verify } from 'jsonwebtoken'

const verifyToken = async (req, res, next) => {
	let authHeader = req.headers['authorization']
	if (!authHeader) {
		return res.status(HttpStatusCodes.UNAUTHORIZED).send({ message: req.__('responses').not_authorized})
	}

	let token = authHeader.split(' ')[1]

	try {
		let decoded = await verify(token, process.env.JWT_KEY)
		// eslint-disable-next-line require-atomic-updates
		req.userId = decoded.id
		next()
	} catch (error) {
		return res.status(HttpStatusCodes.UNAUTHORIZED).send({ message: req.__('responses').not_authorized})
	}
}

export { verifyToken }