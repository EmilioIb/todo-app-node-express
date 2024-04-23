const projectsMiddleware = require('./projects.middleware');
const todosMiddleware = require('./todos.middleware');
const timesMiddleware = require('./times.middleware');
const reportsMiddleware = require('./reports.middleware');

module.exports = {
  projectsMiddleware,
  todosMiddleware,
  timesMiddleware,
  reportsMiddleware,
};
