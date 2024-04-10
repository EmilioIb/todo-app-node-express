const { timesValidator } = require('./validators/index.validator');

class ProjectsMiddleware {
  getTimesTodo = async (req, res, next) => {
    try {
      await timesValidator.getTimesTodo().validateAsync({
        ...req.params,
        ...req.query,
      });

      next();
    } catch (error) {
      res.status(400).json({ status: false, message: error.message || error, data: null });
    }
  };

  workingOnTodo = async (req, res, next) => {
    try {
      await timesValidator.workingOnTodo().validateAsync({
        ...req.params,
      });

      next();
    } catch (error) {
      res.status(400).json({ status: false, message: error.message || error, data: null });
    }
  };

  insertTimeTodo = async (req, res, next) => {
    try {
      await timesValidator.insertTimeTodo().validateAsync({
        ...req.params,
        ...req.body,
      });

      next();
    } catch (error) {
      res.status(400).json({ status: false, message: error.message || error, data: null });
    }
  };

  updateTimeTodo = async (req, res, next) => {
    try {
      await timesValidator.updateTimeTodo().validateAsync({
        ...req.params,
        ...req.body,
      });

      next();
    } catch (error) {
      res.status(400).json({ status: false, message: error.message || error, data: null });
    }
  };

  deleteTimeTodo = async (req, res, next) => {
    try {
      await timesValidator.deleteTimeTodo().validateAsync({
        ...req.params,
        ...req.body,
      });

      next();
    } catch (error) {
      res.status(400).json({ status: false, message: error.message || error, data: null });
    }
  };
}

module.exports = new ProjectsMiddleware();
