const { projectsService } = require('../services/index.service');

class TodosController {
  getProjects = async (req, res, next) => {
    try {
      const { code, payload } = await projectsService.getProjects();
      return res.status(code).json(payload);
    } catch (error) {
      next(error);
    }
  };

  insertProject = async (req, res, next) => {
    try {
      const name = req.body.name.trim();
      const { code, status, msg } = await projectsService.insertProject(name);
      return res.status(code).json({ status, msg });
    } catch (error) {
      next(error);
    }
  };

  updateProject = async (req, res, next) => {
    try {
      const idProject = req.params.idProject;
      const name = req.body.name.trim();
      const { code, status, msg } = await projectsService.updateProject(idProject, name);
      return res.status(code).json({ status, msg });
    } catch (error) {
      next(error);
    }
  };

  deleteProject = async (req, res, next) => {
    try {
      const idsProjects = req.body.idsProjects;

      const returnObj = { msg: 'Result of process', data: [] };
      for (const project of idsProjects) {
        const { status, msg } = await projectsService.deleteProject(project);
        returnObj.data.push({
          idProject: project,
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

module.exports = new TodosController();
