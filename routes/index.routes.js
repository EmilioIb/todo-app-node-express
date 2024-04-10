const express = require('express');
const app = express();

app.use(require('./projects.routes'));
app.use(require('./todos.routes'));
app.use(require('./times.routes'));

module.exports = app;
