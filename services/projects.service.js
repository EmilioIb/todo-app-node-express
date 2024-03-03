const { projectsRepository } = require('../repositories/index.repository');

class ProjectsService {
  getProjects = async () => {
    try {
      const res = await projectsRepository.getProjects();

      if (res.length <= 0) {
        return {
          code: 204,
          payload: {
            status: true,
            msg: 'No data found',
            data: [],
          },
        };
      }

      return {
        code: 200,
        payload: {
          status: true,
          msg: `Users found: ${res.length}`,
          res,
        },
      };
    } catch (error) {
      throw error;
    }
  };

  insertProject = async name => {
    try {
      return await projectsRepository.insertProject(name);
    } catch (error) {
      throw error;
    }
  };

  updateProject = async (idProject, name) => {
    try {
      return await projectsRepository.updateProject(idProject, name);
    } catch (error) {
      throw error;
    }
  };

  deleteProject = async idProject => {
    try {
      return await projectsRepository.deleteProject(idProject);
    } catch (error) {
      throw error;
    }
  };
}
module.exports = new ProjectsService();
