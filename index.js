const express = require('express');
const app = express();
require('dotenv').config()
const routes = require('./routes/routes');
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use('/', routes);



app.listen(PORT, () => console.log(`Server started on port ${PORT}`));