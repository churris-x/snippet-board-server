# Snippet Board Backend

Express JS backend server for my Snippet Board website.

## Routes
- /user
	- `POST		:4000/user/signup`			body: { name, email, password }
	- `POST		:4000/user/login`			body: { name, password } response: { token }
	- `GET		:4000/user/me`				header: { Authorization:'Bearer token' } response: { id, name, email }

- /snippets
	<!-- - `GET		:4000/snippets` 			response: {[ snippets ]} -->
	- `GET		:4000/snippets/user` 			header: { Authorization:'Bearer token' } response: {[ userSnippets ]}
	- `POST		:4000/snippets/user`			header: { Authorization:'Bearer token' } body: { title, imgUrl, minimumBid }
	- `GET		:4000/snippets/user/:postId` 	header: { Authorization:'Bearer token' } response: { userSnippet }
	- `PATCH 	:4000/snippets/user/:postId`	header: { Authorization:'Bearer token' } response: { updatedPost }
	- `DELETE 	:4000/snippets/user/:postId`	header: { Authorization:'Bearer token' }

## Technologies
 - Express JS
 - Sequelize
 - Developed with [ElephantSQL](https://www.elephantsql.com/), deployed with [Heroku](https://www.heroku.com/)