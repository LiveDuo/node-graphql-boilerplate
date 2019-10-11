const env = process.env.NODE_ENV || 'development'

const configEnvs = {
	development: {
		defaultPort: 3000
	},
	production: {
		defaultPort: 3000
	}
}

const config = configEnvs[env]

export { config }