const queryGenerator = require('../utils/queryGenerator');

class ProjectsRepository {
  getProjects = async () => {
    try {
      const query = 'select public.projects_get_projects();';
      const res = await queryGenerator.executeQuery(query, {}, false);
      return res[0].projects_get_projects;
    } catch (error) {
      throw error;
    }
  };

  insertProject = async name => {
    try {
      const query = 'select public.projects_ins_project(:name)';
      const res = await queryGenerator.executeQuery(
        query,
        {
          name,
        },
        false
      );
      return res[0].projects_ins_project;
    } catch (error) {
      throw error;
    }
  };

  updateProject = async (idProject, name) => {
    try {
      const query = 'select public.projects_upd_project(:idProject, :name)';
      const res = await queryGenerator.executeQuery(
        query,
        {
          idProject,
          name,
        },
        false
      );
      return res[0].projects_upd_project;
    } catch (error) {
      throw error;
    }
  };

  deleteProject = async (idProject, safeDelete) => {
    try {
      const query = 'select public.projects_del_project(:idProject, :safeDelete)';
      const res = await queryGenerator.executeQuery(
        query,
        {
          idProject,
          safeDelete,
        },
        false
      );
      return res[0].projects_del_project;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = new ProjectsRepository();
