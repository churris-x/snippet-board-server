const { Router } = require('express');
const bcrypt = require('bcrypt');

const { user } = require('../models');
const { toToken, SALT_ROUNDS } = require('../constants');
const { auth } = require('./middleware');

// PATH	/users
const router = new Router();

router.post('/signup', async (request, response) => {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
        return response.status(400).send('Invalid user!');
    }

    try {
        const alreadyUser = await user.findOne({ where: { email } });
        if (alreadyUser) {
            return response
                .status(400)
                .send('Email is invalid or already taken!');
        }

        const newUser = await user.create({
            name,
            email,
            password: bcrypt.hashSync(password, SALT_ROUNDS),
        });
        response.send('Successfully created user');
    } catch (error) {
        response.status(500).send(`Sequelize: ${error.message}`);
    }
});

router.post('/login', async (request, response) => {
    const { email, password } = request.body;

    if (!email || !password) {
        return response.status(400).send('Incorrect email or password');
    }

    try {
        const alreadyUser = await user.findOne({ where: { email } });
        if (!alreadyUser) {
            return response.status(400).send('Incorrect email or password');
        }

        if (bcrypt.compareSync(password, alreadyUser.password)) {
            const token = toToken({ userId: alreadyUser.id });

            delete alreadyUser.dataValues['password'];

            response.send({ token, ...alreadyUser.dataValues });
        } else {
            response.status(400).send('Incorrect email or password');
        }
    } catch (error) {
        response.status(400).send('Incorrect email or password');
    }
});

router.get('/me', auth, async (request, response) => {
    response.send(request.user);
});

module.exports = router;
