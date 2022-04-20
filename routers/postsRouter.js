const { Router } = require("express");

const { auth } = require("./middleware");
const { user, post, sequelize } = require("../models");

// PATH	/posts
const router = new Router();

router.get('/', async (request, response) => {
	try {
		const allArtworks = await artwork.findAll({
			// attributes: {
			// 	include: [
			// 		[sequelize.fn("COUNT", sequelize.col("bids")), "bidCount"]
			// 	]
			// },
			// include: {
			// 	model: bid,
			// 	attributes: []
			// },
			// group: ['artwork.id'],
		});
		response.send(allArtworks);
	} catch (error) {
		response.status(500).send(`Something went wrong: ${error.message}`);
	}
});

module.exports = router;