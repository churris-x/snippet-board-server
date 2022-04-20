const jwt = require('./jwt')

module.exports = {
	SALT_ROUNDS: 12,
	PORT: process.env.PORT || 4000,
	...jwt,
	JWT_SECRET: process.env.JWT_SECRET || "edasf9TOPSECRETrp^&^*&@hfransKKdfs2842{}:<dsa,m",
};
