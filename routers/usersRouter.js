const { Router } = require("express");
const bcrypt = require("bcrypt");

const { user } = require("../models");
const { toToken, SALT_ROUNDS } = require("../constants");
const { auth } = require("./middleware");

// PATH	/users
const router = new Router();

router.post('/signup', async (request, response) => {
	const { name, email, password } = request.body;

	if (!name || !email || !password) {
		return response.status(400).send('Invalid user!');
	}

	const alreadyUser = await user.findOne({ where: { email } });
	if (alreadyUser) {
		return response.status(400).send('Email is invalid or already taken!');
	}

	console.log(SALT_ROUNDS, typeof SALT_ROUNDS)
	try {
		const newUser = await user.create({
			name,
			email,
			password: bcrypt.hashSync(password, SALT_ROUNDS),
		});
		response.send('Successfully created user');
	} catch (error) {
		response.status(500).send(`Something went wrong: ${error.message}`);
	}
});

router.post('/login', async (request, response) => {
	const { email, password } = request.body;

	if (!email || !password) {
		return response.status(400).send('Incorrect email or password');
	}

	const alreadyUser = await user.findOne({ where: { email } });
	if (!alreadyUser) {
		return response.status(400).send('Incorrect email or password');
	}

	if (bcrypt.compareSync(password, alreadyUser.password)) {

		const token = toToken({ userId: alreadyUser.id });
		response.send({ token });
	} else {
		response.status(400).send('Incorrect email or password');
	}
});

module.exports = router;