const { timesService } = require('../services/index.service');

class TimesController {
  getTimesTodo = async (req, res, next) => {
    try {
      const { idTodo } = req.params;
      const { timeOffset } = req.query;
      const { code, payload } = await timesService.getTimesTodo(idTodo, timeOffset);
      return res.status(code).json(payload);
    } catch (error) {
      next(error);
    }
  };

  workingOnTodo = async (req, res, next) => {
    try {
      const { idTodo } = req.params;
      const { code, status, msg } = await timesService.workingOnTodo(idTodo);
      return res.status(code).json({ status, msg });
    } catch (error) {
      next(error);
    }
  };

  insertTimeTodoManually = async (req, res, next) => {
    try {
      const { idTodo } = req.params;
      const { fromDate, toDate } = req.body;
      const { code, status, msg } = await timesService.insertTimeTodoManually(idTodo, fromDate, toDate);
      return res.status(code).json({ status, msg });
    } catch (error) {
      next(error);
    }
  };

  updateTimeTodoManually = async (req, res, next) => {
    try {
      const { idTodo, idTimesTodo } = req.params;
      const { fromDate, toDate } = req.body;
      const { code, status, msg } = await timesService.updateTimeTodoManually(idTimesTodo, idTodo, fromDate, toDate);
      return res.status(code).json({ status, msg });
    } catch (error) {
      next(error);
    }
  };

  deleteTimeTodoManually = async (req, res, next) => {
    try {
      const { idsTimesTodo } = req.body;

      const returnObj = { msg: 'Result of process', data: [] };
      for (const idTimesTodo of idsTimesTodo) {
        const { status, msg } = await timesService.deleteTimeTodoManually(idTimesTodo);
        returnObj.data.push({
          idTimesTodo,
          status,
          msg,
        });
      }

      return res.status(200).json(returnObj);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new TimesController();
