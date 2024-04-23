const joi = require('joi');

class ProjectsValidator {
  uncompletedTodos = () => {
    return joi
      .object()
      .keys({
        timeOffset: joi.number().required(),
        email: joi.string().email().required(),
      })
      .options({ allowUnknown: true, stripUnknown: true });
  };

  allTodos = () => {
    return joi
      .object()
      .keys({
        timeOffset: joi.number().required(),
        fromDate: joi.date().max(joi.ref('toDate')).required(),
        toDate: joi.date().max('now').required(),
        email: joi.string().email().required(),
      })
      .options({ allowUnknown: true, stripUnknown: true });
  };

  projectTodos = () => {
    return joi
      .object()
      .keys({
        timeOffset: joi.number().required(),
        idProject: joi.number().required(),
        email: joi.string().email().required(),
      })
      .options({ allowUnknown: true, stripUnknown: true });
  };
}

module.exports = new ProjectsValidator();
