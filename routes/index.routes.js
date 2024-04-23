const express = require('express');
const app = express();

app.use(require('./projects.routes'));
app.use(require('./todos.routes'));
app.use(require('./times.routes'));
app.use(require('./reports.routes'));

module.exports = app;
