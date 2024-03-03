const { projectsValidator } = require('./validators/index.validator');

class ProjectsMiddleware {
  insertProject = async (req, res, next) => {
    try {
      await projectsValidator.insertProject().validateAsync({
        ...req.body,
      });

      next();
    } catch (error) {
      res.status(400).json({ status: false, message: error.message || error, data: null });
    }
  };

  validIdProject = async (req, res, next) => {
    try {
      await projectsValidator.validIdProject().validateAsync({
        ...req.params,
      });

      next();
    } catch (error) {
      res.status(400).json({ status: false, message: error.message || error, data: null });
    }
  };

  deleteProjects = async (req, res, next) => {
    try {
      await projectsValidator.deleteProjects().validateAsync({
        ...req.body,
      });

      next();
    } catch (error) {
      res.status(400).json({ status: false, message: error.message || error, data: null });
    }
  };
}

module.exports = new ProjectsMiddleware();
