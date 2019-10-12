import mongoose from 'mongoose'

// user: process.env.MONGO_USER,
// pass: process.env.MONGO_PASSWORD,

const options = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }

let mongoDb

const connect = async () => {
	let res = await mongoose.connect(process.env.MONGO_URL, options)
	console.log('Mongoose connected!')
	return res
}

export { connect, mongoDb }