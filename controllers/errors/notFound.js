import HttpStatusCodes from 'http-status-codes'

const notFound = (req, res) => {
	return res.status(HttpStatusCodes.NOT_FOUND).send('Unlucky')
}
export { notFound }