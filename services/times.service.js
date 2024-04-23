const { timesRepository } = require('../repositories/index.repository');
const mapper = require('../utils/mapper');
const moment = require('moment');

class TimesService {
  getTimesTodo = async (idTodo, timeOffset) => {
    try {
      const timesRaw = await timesRepository.getTimesTodo(idTodo);
      const { timesTodoClean } = mapper.mappTimesTodos(timesRaw, timeOffset);

      return {
        code: 200,
        payload: {
          status: true,
          msg: `Times found: ${timesTodoClean.length}`,
          times: timesTodoClean,
        },
      };
    } catch (error) {
      throw error;
    }
  };

  workingOnTodo = async idTodo => {
    try {
      return await timesRepository.workingOnTodo(idTodo);
    } catch (error) {
      throw error;
    }
  };

  insertTimeTodoManually = async (idTodo, fromDate, toDate) => {
    try {
      const timesTodo = await timesRepository.getTimesTodo(idTodo);

      this.validateTodoIns(fromDate, toDate, timesTodo);

      return await timesRepository.insertTimeTodoManually(idTodo, fromDate, toDate);
    } catch (error) {
      throw error;
    }
  };

  updateTimeTodoManually = async (idTimesTodo, idTodo, fromDate, toDate) => {
    try {
      const timesTodo = await timesRepository.getTimesTodo(idTodo);
      const timesTodoFilter = timesTodo.filter(time => time.id_times_todo != idTimesTodo);
      this.validateTodoIns(fromDate, toDate, timesTodoFilter);

      return await timesRepository.updateTimeTodoManually(idTimesTodo, idTodo, fromDate, toDate);
    } catch (error) {
      throw error;
    }
  };

  deleteTimeTodoManually = async idTimeTodo => {
    try {
      return await timesRepository.deleteTimeTodoManually(idTimeTodo);
    } catch (error) {
      throw error;
    }
  };

  validateTodoIns = (fromDate, toDate, timesTodo) => {
    try {
      for (const timeTodo of timesTodo) {
        if (moment(fromDate).isBetween(timeTodo.started_at, timeTodo.stopped_at)) throw 'Time invalid to insert';
        if (moment(toDate).isBetween(timeTodo.started_at, timeTodo.stopped_at)) throw 'Time invalid to insert';
      }
    } catch (error) {
      throw error;
    }
  };
}

module.exports = new TimesService();
