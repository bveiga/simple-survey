module.exports = {
	development: {
		secret: 'authenticationsecret',
		url: process.env.DATABASE_URL,
		dialect: 'mysql'
	},
	production: {
		secret: 'authenticationsecret',
		url: process.env.DATABASE_URL,
		dialect: 'mysql'
	}
};