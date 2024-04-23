const queryGenerator = require('../utils/queryGenerator');

class ReportsRepository {
  uncompletedTodos = async () => {
    try {
      const query = 'select public.todos_get_todos_report_uncomplete();';
      const res = await queryGenerator.executeQuery(query, {}, false);
      return res[0].todos_get_todos_report_uncomplete;
    } catch (error) {
      throw error;
    }
  };

  allTodos = async (fromDate, toDate) => {
    try {
      const query = 'select public.todos_get_todos_report_all(:fromDate, :toDate);';
      const res = await queryGenerator.executeQuery(query, { fromDate, toDate }, false);
      return res[0].todos_get_todos_report_all;
    } catch (error) {
      throw error;
    }
  };

  projectTodos = async idProject => {
    try {
      const query = 'select public.todos_get_todos_report_project(:idProject);';
      const res = await queryGenerator.executeQuery(query, { idProject }, false);
      return res[0].todos_get_todos_report_project;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = new ReportsRepository();
