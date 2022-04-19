const express = require("express");
const jsonParser = express.json()
const cors = require('cors');

const PORT = 4005;

const app = express();

app.use(cors());
app.use(jsonParser);

app.get('/', (request, response) => response.send('Hello world!'));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));