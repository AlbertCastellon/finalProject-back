const express = require('express');
const app = express();
require('dotenv').config()
const usersRoutes = require('./routes/usersRoutes');
const comentsRoutes = require('./routes/comentsRoutes');
const PORT = process.env.PORT || 8080;
const cors = require('cors')

app.use(cors())
app.use(express.json());

app.use('/', usersRoutes);
app.use('/', comentsRoutes);



app.listen(PORT, () => console.log(`Server started on port ${PORT}`));