const jwt = require('./jwt');

module.exports = {
    SALT_ROUNDS: process.env.SALT_ROUNDS || 12,
    PORT: process.env.PORT || 4055,
    ...jwt,
};
