const { reportsValidator } = require('./validators/index.validator');

class ProjectsMiddleware {
  uncompletedTodos = async (req, res, next) => {
    try {
      await reportsValidator.uncompletedTodos().validateAsync({
        ...req.body,
        ...req.query,
      });

      next();
    } catch (error) {
      res.status(400).json({ status: false, message: error.message || error, data: null });
    }
  };

  allTodos = async (req, res, next) => {
    try {
      await reportsValidator.allTodos().validateAsync({
        ...req.body,
        ...req.query,
      });

      next();
    } catch (error) {
      res.status(400).json({ status: false, message: error.message || error, data: null });
    }
  };

  projectTodos = async (req, res, next) => {
    try {
      await reportsValidator.projectTodos().validateAsync({
        ...req.body,
        ...req.query,
      });

      next();
    } catch (error) {
      res.status(400).json({ status: false, message: error.message || error, data: null });
    }
  };
}

module.exports = new ProjectsMiddleware();
