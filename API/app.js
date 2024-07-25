const express = require('express');
require('dotenv').config();
const app = express();








module.exports = app;

const PORT = process.env.PORT || 4001;

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});