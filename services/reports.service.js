const moment = require('moment');

const { reportsRepository, projectsRepository } = require('../repositories/index.repository');
const mapper = require('../utils/mapper');
const timesUtil = require('../utils/times.utils');
const excelUtils = require('../utils/excel');
const sendMailUtils = require('../utils/sendEmail');

class ReportsService {
  uncompletedTodos = async (email, timeOffset) => {
    try {
      const todosRaw = await reportsRepository.uncompletedTodos();
      const todosClean = mapper.mappTodosReport(todosRaw, timeOffset);
      const report = await excelUtils.createReport(todosClean, 'Active Todos');
      const res = await sendMailUtils.sendMail(email, report);

      return {
        code: 200,
        payload: {
          status: true,
          msg: res,
          data: [],
        },
      };
    } catch (error) {
      throw error;
    }
  };

  allTodos = async (email, timeOffset, fromDate, toDate) => {
    try {
      fromDate = moment(timesUtil.transformDateToUtcHour(fromDate, timeOffset)).startOf('day').add(6, 'hours').format('YYYY-MM-DD HH:mm:ss.SSS');
      toDate = moment(timesUtil.transformDateToUtcHour(toDate, timeOffset)).endOf('day').add(6, 'hours').format('YYYY-MM-DD HH:mm:ss.SSS');

      const todosRaw = await reportsRepository.allTodos(fromDate, toDate);
      const todosClean = mapper.mappTodosReport(todosRaw, timeOffset);
      const report = await excelUtils.createReport(todosClean, 'All Todos');
      const res = await sendMailUtils.sendMail(email, report);

      return {
        code: 200,
        payload: {
          status: true,
          msg: res,
          data: [],
        },
      };
    } catch (error) {
      throw error;
    }
  };

  projectTodos = async (email, timeOffset, idProject) => {
    try {
      const projects = await projectsRepository.getProjects();

      const projectToFind = projects.find(project => project.id_project === idProject);
      if (!projectToFind) throw 'Project not found';

      const todosRaw = await reportsRepository.projectTodos(idProject);
      const todosClean = mapper.mappTodosReport(todosRaw, timeOffset);
      const report = await excelUtils.createReport(todosClean, `${todosClean[0][1]} Todos`);
      const res = await sendMailUtils.sendMail(email, report);

      return {
        code: 200,
        payload: {
          status: true,
          msg: res,
          data: [],
        },
      };
    } catch (error) {
      throw error;
    }
  };
}

module.exports = new ReportsService();
