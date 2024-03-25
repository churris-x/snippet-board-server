const { user } = require('../models');
const { toData } = require('../constants');

const auth = async (request, response, next) => {
    const token = request.headers.authorization;

    if (!token || !token.includes('Bearer ')) {
        return response.status(400).send('Invalid request');
    }

    try {
        const { userId } = toData(token.split(' ')[1]);
        const isUser = await user.findByPk(userId, {
            attributes: { exclude: 'password' },
        });

        if (isUser) {
            request.user = isUser;
            next();
        } else throw 'not in database';
    } catch (error) {
        response.status(401).send('Invalid token');
    }
};

module.exports = { auth };
