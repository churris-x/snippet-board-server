const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require('./');

const toToken = data => jwt.sign(data, JWT_SECRET, { expiresIn: "12h" });

const toData = token => jwt.verify(token, JWT_SECRET);

module.exports = { toToken, toData };