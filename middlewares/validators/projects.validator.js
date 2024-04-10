const joi = require('joi');

class ProjectsValidator {
  insertProject = () => {
    return joi
      .object()
      .keys({
        name: joi.string().required(),
      })
      .options({ allowUnknown: true, stripUnknown: true });
  };

  validIdProject = () => {
    return joi
      .object()
      .keys({
        idProject: joi.number().integer().positive().required(),
      })
      .options({ allowUnknown: true, stripUnknown: true });
  };

  deleteProjects = () => {
    return joi
      .object()
      .keys({
        idsProjects: joi.array().items(joi.number().integer().positive()).min(1).required(),
        safeDelete: joi.bool().required(),
      })
      .options({ allowUnknown: true, stripUnknown: true });
  };
}

module.exports = new ProjectsValidator();
