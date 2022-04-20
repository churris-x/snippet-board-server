const { user } = require("../models");

const auth = async (request, response, next) => {

	const token = request.headers.authorization;

	if (!token || !token.includes('Bearer ')) {
		return response.status(400).send("Invalid request");
	}

	try {
		const { userId } = toData(token.split(' ')[1]);

		// add userId to request object
		request.user = { id: userId };

		// checks if user exists in database -> check if user is deleted
		const isUser = await user.findByPk(userId);

		if (isUser) {	// comment this out?
			next();
		} else {
			throw 'not in database'
		}
	} catch (error) {
		response.status(401).send("Invalid token");
	}
};

module.exports = { auth };