const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET || "edasf9TOPSECRETrp^&^*&@hfransKKdfs2842{}:<dsa,m";

const toToken = data => jwt.sign(data, secret, { expiresIn: "7d" });

const toData = token => jwt.verify(token, secret);

module.exports = { toToken, toData };