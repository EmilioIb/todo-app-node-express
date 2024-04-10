const { todosValidator } = require('./validators/index.validator');

class TodosMiddleware {
  getTodos = async (req, res, next) => {
    try {
      await todosValidator.getTodos().validateAsync({
        ...req.query,
      });

      next();
    } catch (error) {
      res.status(400).json({ status: false, message: error.message || error, data: null });
    }
  };

  insertTodo = async (req, res, next) => {
    try {
      await todosValidator.insertTodo().validateAsync({
        ...req.body,
      });

      next();
    } catch (error) {
      res.status(400).json({ status: false, message: error.message || error, data: null });
    }
  };

  updateTodo = async (req, res, next) => {
    try {
      await todosValidator.updateTodo().validateAsync({
        ...req.params,
        ...req.body,
      });

      next();
    } catch (error) {
      res.status(400).json({ status: false, message: error.message || error, data: null });
    }
  };

  deleteTodos = async (req, res, next) => {
    try {
      await todosValidator.deleteTodos().validateAsync({
        ...req.body,
      });

      next();
    } catch (error) {
      res.status(400).json({ status: false, message: error.message || error, data: null });
    }
  };

  completeTodo = async (req, res, next) => {
    try {
      await todosValidator.completeTodo().validateAsync({
        ...req.params,
      });

      next();
    } catch (error) {
      res.status(400).json({ status: false, message: error.message || error, data: null });
    }
  };
}

module.exports = new TodosMiddleware();
