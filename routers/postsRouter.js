const { Router } = require("express");

const { auth } = require("./middleware");
const { user, post, sequelize } = require("../models");

// PATH	/posts
const router = new Router();

// router.get('/', async (request, response) => {
// 	try {
// 		const allPosts = await post.findAll({
// 			// attributes: {
// 			// 	include: [
// 			// 		[sequelize.fn("COUNT", sequelize.col("bids")), "bidCount"]
// 			// 	]
// 			// },
// 			// include: {
// 			// 	model: bid,
// 			// 	attributes: []
// 			// },
// 			// group: ['post.id'],
// 		});
// 		response.send(allPosts);
// 	} catch (error) {
// 		response.status(500).send(`Something went wrong: ${error.message}`);
// 	}
// });

router.get('/user', auth, async (request, response) => {
	const { id } = request.user;

	try {
		const userPosts = await post.findAll({
			where: { userId: id },
			order: [['updatedAt', 'DESC']]
		});
		response.send(userPosts);
	} catch (error) {
		response.status(500).send(`Something went wrong: ${error.message}`);
	}
});

router.post('/user', auth, async (request, response) => {
	const { id } = request.user;
	const {
		title,
		body,
		syntax
	} = request.body;

	if (!title || !body) return response.status(400).send('Missing title or body');

	try {
		const newPost = await post.create({
			title,
			body,
			syntax,
			userId: id,
		});
		response.send(newPost);
	} catch (error) {
		response.status(500).send(`Something went wrong: ${error.message}`);
	}
});

module.exports = router;