const { todosService } = require('../services/index.service');

class TodosController {
  getTodos = async (req, res, next) => {
    try {
      const { timeOffset } = req.query;
      const { code, payload } = await todosService.getTodos(timeOffset);
      return res.status(code).json(payload);
    } catch (error) {
      next(error);
    }
  };

  insertTodo = async (req, res, next) => {
    try {
      const name = req.body.name.trim();
      const { idProject } = req.body;
      const { code, status, msg } = await todosService.insertTodo(name, idProject);
      return res.status(code).json({ status, msg });
    } catch (error) {
      next(error);
    }
  };

  updateTodo = async (req, res, next) => {
    try {
      const { idTodo } = req.params;
      const name = req.body.name.trim();
      const idProject = req.body.idProject;
      const { code, status, msg } = await todosService.updateTodo(idTodo, name, idProject);
      return res.status(code).json({ status, msg });
    } catch (error) {
      next(error);
    }
  };

  deleteTodo = async (req, res, next) => {
    try {
      const { idsTodos } = req.body;

      const returnObj = { msg: 'Result of process', data: [] };
      for (const todo of idsTodos) {
        const { status, msg } = await todosService.deleteTodo(todo);
        returnObj.data.push({
          idTodo: todo,
          status,
          msg,
        });
      }

      return res.status(200).json(returnObj);
    } catch (error) {
      next(error);
    }
  };

  completeTodo = async (req, res, next) => {
    try {
      const { idTodo } = req.params;
      const { code, status, msg } = await todosService.completeTodo(idTodo);
      return res.status(code).json({ status, msg });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new TodosController();
