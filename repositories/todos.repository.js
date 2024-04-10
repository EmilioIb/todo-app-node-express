const queryGenerator = require('../utils/queryGenerator');

class TodosRepository {
  getTodos = async () => {
    try {
      const query = 'select public.todos_get_todos();';
      const res = await queryGenerator.executeQuery(query, {}, false);
      return res[0].todos_get_todos;
    } catch (error) {
      throw error;
    }
  };

  insertTodo = async (name, idProject) => {
    try {
      const query = 'select public.todos_ins_todo(:name, :idProject);';
      const res = await queryGenerator.executeQuery(
        query,
        {
          name,
          idProject,
        },
        false
      );
      return res[0].todos_ins_todo;
    } catch (error) {
      throw error;
    }
  };

  updateTodo = async (idTodo, name, idProject) => {
    try {
      const query = 'select public.todos_upd_todo(:idTodo, :name, :idProject)';
      const res = await queryGenerator.executeQuery(
        query,
        {
          idTodo,
          name,
          idProject,
        },
        false
      );
      return res[0].todos_upd_todo;
    } catch (error) {
      throw error;
    }
  };

  deleteTodo = async idTodo => {
    try {
      const query = 'select public.todos_del_todo(:idTodo)';
      const res = await queryGenerator.executeQuery(
        query,
        {
          idTodo,
        },
        false
      );
      return res[0].todos_del_todo;
    } catch (error) {
      throw error;
    }
  };

  completeTodo = async idTodo => {
    try {
      const query = 'select public.todos_complete_finish_todo(:idTodo)';
      const res = await queryGenerator.executeQuery(
        query,
        {
          idTodo,
        },
        false
      );
      return res[0].todos_complete_finish_todo;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = new TodosRepository();
