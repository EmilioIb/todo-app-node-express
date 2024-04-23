const queryGenerator = require('../utils/queryGenerator');

class TimesRepository {
  getTimesTodo = async idTodo => {
    try {
      const query = 'select public.todos_get_times(:idTodo);';
      const res = await queryGenerator.executeQuery(query, { idTodo }, false);
      return res[0].todos_get_times;
    } catch (error) {
      throw error;
    }
  };

  workingOnTodo = async idTodo => {
    try {
      const query = 'select public.todos_working_on_todo(:idTodo);';
      const res = await queryGenerator.executeQuery(query, { idTodo }, false);
      return res[0].todos_working_on_todo;
    } catch (error) {
      throw error;
    }
  };

  insertTimeTodoManually = async (idTodo, fromDate, toDate) => {
    try {
      const query = 'select public.times_todo_ins_time(:idTodo, :fromDate, :toDate)';
      const res = await queryGenerator.executeQuery(
        query,
        {
          idTodo,
          fromDate,
          toDate,
        },
        false
      );
      return res[0].times_todo_ins_time;
    } catch (error) {
      throw error;
    }
  };

  updateTimeTodoManually = async (idTimesTodo, idTodo, fromDate, toDate) => {
    try {
      const query = 'select public.times_todo_upd_time(:idTimesTodo, :idTodo, :fromDate, :toDate)';
      const res = await queryGenerator.executeQuery(
        query,
        {
          idTimesTodo,
          idTodo,
          fromDate,
          toDate,
        },
        false
      );
      return res[0].times_todo_upd_time;
    } catch (error) {
      throw error;
    }
  };

  deleteTimeTodoManually = async idTimeTodo => {
    try {
      const query = 'select public.times_todo_del_time( :idTimeTodo)';
      const res = await queryGenerator.executeQuery(
        query,
        {
          idTimeTodo,
        },
        false
      );
      return res[0].times_todo_del_time;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = new TimesRepository();
