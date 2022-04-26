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
		response.status(500).send(`Sequelize: ${error.message}`);
	}
});

router.post('/user', auth, async (request, response) => {
	const { id } = request.user;
	const { title, body, syntax } = request.body;

	if (!title || !body) return response.status(400).send('Missing title or body');

	try {
		const newPost = await post.create({
			title,
			body,
			syntax: syntax || 'plain_text',
			userId: id,
		});
		response.send(newPost);
	} catch (error) {
		response.status(500).send(`Sequelize: ${error.message}`);
	}
});

router.get('/user/:postId', auth, async (request, response) => {
	const { id } = request.user;
	const { postId } = request.params;

	try {
		const onePost = await post.findOne({
			where: { id: postId, userId: id }
		});
		if (!onePost) return response.status(400).send('Post does not exist');

		response.send(onePost);
	} catch (error) {
		response.status(500).send(`Sequelize: ${error.message}`);
	}
});

router.patch('/user/:postId', auth, async (request, response) => {
	const { id } = request.user;
	const { postId } = request.params;
	const { title, body, syntax } = request.body;

	if (!title || !body) return response.status(400).send('Missing title or body');

	try {
		const onePost = await post.findOne({ where: { id: postId, userId: id } });
		if (!onePost) return response.status(400).send('Post does not exist');

		const newPost = await post.update({
			title,
			body,
			syntax: syntax || 'plain_text',
		}, {
			where: { id: postId, userId: id }
		});

		const updatedPost = await post.findOne({ where: { id: postId, userId: id } });

		response.send(updatedPost);
	} catch (error) {
		response.status(500).send(`Sequelize: ${error.message}`);
	}
});

router.delete('/user/:postId', auth, async (request, response) => {
	const { id } = request.user;
	const { postId } = request.params;

	try {
		const onePost = await post.findOne({ where: { id: postId, userId: id } });
		if (!onePost) return response.status(400).send('Post does not exist');

		const deletedPost = await post.destroy({ where: { id: postId, userId: id } });

		response.send('Deleted post');
	} catch (error) {
		response.status(500).send(`Sequelize: ${error.message}`);
	}
});

module.exports = router;