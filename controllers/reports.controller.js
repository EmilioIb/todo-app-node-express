const { reportService } = require('../services/index.service');

class ReportsController {
  uncompletedTodos = async (req, res, next) => {
    try {
      const { timeOffset } = req.query;
      const { email } = req.body;
      const { code, payload } = await reportService.uncompletedTodos(email, timeOffset);
      return res.status(code).json(payload);
    } catch (error) {
      next(error);
    }
  };

  allTodos = async (req, res, next) => {
    try {
      const { timeOffset } = req.query;
      const { fromDate, toDate, email } = req.body;
      const { code, payload } = await reportService.allTodos(email, timeOffset, fromDate, toDate);
      return res.status(code).json(payload);
    } catch (error) {
      next(error);
    }
  };

  projectTodos = async (req, res, next) => {
    try {
      const { timeOffset } = req.query;
      const { idProject, email } = req.body;
      const { code, payload } = await reportService.projectTodos(email, timeOffset, idProject);
      return res.status(code).json(payload);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new ReportsController();
