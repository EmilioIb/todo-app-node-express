const { projectsRepository } = require('../repositories/index.repository');
const mapper = require('../utils/mapper');

class ProjectsService {
  getProjects = async () => {
    try {
      const projectsRaw = await projectsRepository.getProjects();
      const projectsClean = mapper.mappProjects(projectsRaw);

      return {
        code: 200,
        payload: {
          status: true,
          msg: `Projects found: ${projectsClean.length}`,
          projectsClean,
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

  deleteProject = async (idProject, safeDelete) => {
    try {
      return await projectsRepository.deleteProject(idProject, safeDelete);
    } catch (error) {
      throw error;
    }
  };
}

module.exports = new ProjectsService();
