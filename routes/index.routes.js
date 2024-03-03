const express = require('express');
const app = express();

app.use(require('./projects.routes'));

module.exports = app;
