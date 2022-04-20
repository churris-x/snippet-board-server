const express = require("express");
const jsonParser = express.json()
const cors = require('cors');

const { PORT } = require('./constants');

const usersRouter = require('./routers/usersRouter');
// const postsRouter = require('./routers/postsRouter');

const app = express();

app.use(cors());
app.use(jsonParser);

app.get('/', (request, response) => response.send('Hello world!'));
app.use('/users', usersRouter);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));