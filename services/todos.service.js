const { todosRepository } = require('../repositories/index.repository');
const mapper = require('../utils/mapper');

class TodosService {
  getTodos = async timeOffset => {
    try {
      const todosRaw = await todosRepository.getTodos();
      let todosClean = mapper.mappTodos(todosRaw, timeOffset);

      return {
        code: 200,
        payload: {
          status: true,
          msg: `Todos found: ${todosRaw.length}`,
          todosClean,
        },
      };
    } catch (error) {
      throw error;
    }
  };

  insertTodo = async (name, idProject) => {
    try {
      return await todosRepository.insertTodo(name, idProject);
    } catch (error) {
      throw error;
    }
  };

  updateTodo = async (idTodo, name, idProject) => {
    try {
      return await todosRepository.updateTodo(idTodo, name, idProject);
    } catch (error) {
      throw error;
    }
  };

  deleteTodo = async idTodo => {
    try {
      return await todosRepository.deleteTodo(idTodo);
    } catch (error) {
      throw error;
    }
  };

  completeTodo = async idTodo => {
    try {
      return await todosRepository.completeTodo(idTodo);
    } catch (error) {
      throw error;
    }
  };
}
module.exports = new TodosService();
