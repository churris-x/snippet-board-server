# Snippet Board Backend

Express JS backend server for my Snippet Board website. 

Handles user account (login, signup) and snippet CRUD.

## Data structure

Snippets

| Key         | Type    | Nullable | Notes                       |
|-------------|---------|----------|-----------------------------|
| id          | integer | false    | pk, auto increment          |
| title       | string  | false    |                             |
| description | text    | true     | Long text, varchar          |
| body        | text    | false    | Long text, varchar          |
| syntax      | string  | false    | default value: 'plain_text' |

## Routes
/
- `GET		:4055/`							response: 'Hello world!'

/user
- `POST		:4055/users/signup`				body: { name, email, password }
- `POST		:4055/users/login`				body: { name, password } response: { token }
- `GET		:4055/users/me`					header: { Authorization:'Bearer token' } response: { id, name, email }

/snippets
<!-- - `GET		:4055/snippets` 			response: {[ snippets ]} -->
- `GET		:4055/snippets/user` 			header: { Authorization:'Bearer token' } response: {[ userSnippets ]}
- `POST		:4055/snippets/user`			header: { Authorization:'Bearer token' } body: { title, imgUrl, minimumBid }
- `GET		:4055/snippets/user/:postId` 	header: { Authorization:'Bearer token' } response: { userSnippet }
- `PATCH 	:4055/snippets/user/:postId`	header: { Authorization:'Bearer token' } response: { updatedPost }
- `DELETE 	:4055/snippets/user/:postId`	header: { Authorization:'Bearer token' }

## Technologies
 - Express JS
 - Sequelize
 - JWT Authentication with bcrypt
 - Developed with [ElephantSQL](https://www.elephantsql.com/), deployed with [Heroku](https://www.heroku.com/)