const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());

const userRoutes = require('./routes/userRoutes');
app.use(userRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;