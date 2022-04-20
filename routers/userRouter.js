const { Router } = require("express");

const { auth } = require("./middleware");
const { user } = require("../models");

// PATH	/user
const router = new Router();


module.exports = router;