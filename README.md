# Snippet Board Backend

Express JS backend server for my Snippet Board website.

## Routes

- /snippets
	- `GET		:4000/snippets` 			response: [{ snippets }]
	- `POST		:4000/snippets` 			header: { Authorization:'Bearer token' } body: { title, imgUrl, minimumBid }
	- `GET		:4000/snippets/:id` 		response: { snippet }
	- `PATCH 	:4000/`

## Technologies
 - Express
 - Sequelize
 - Database with ElephantSQL