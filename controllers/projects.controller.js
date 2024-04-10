const { projectsService } = require('../services/index.service');

class ProjectsController {
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
      const { idProject } = req.params;
      const name = req.body.name.trim();
      const { code, status, msg } = await projectsService.updateProject(idProject, name);
      return res.status(code).json({ status, msg });
    } catch (error) {
      next(error);
    }
  };

  deleteProject = async (req, res, next) => {
    try {
      const { idsProjects, safeDelete } = req.body;

      const returnObj = { msg: 'Result of process', data: [] };
      for (const idProject of idsProjects) {
        const { status, msg } = await projectsService.deleteProject(idProject, safeDelete);
        returnObj.data.push({
          idProject,
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

module.exports = new ProjectsController();
