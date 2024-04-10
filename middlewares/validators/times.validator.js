const joi = require('joi');

class ProjectsValidator {
  getTimesTodo = () => {
    return joi
      .object()
      .keys({
        idTodo: joi.number().integer().positive().required(),
        timeOffset: joi.number().required(),
      })
      .options({ allowUnknown: true, stripUnknown: true });
  };

  workingOnTodo = () => {
    return joi
      .object()
      .keys({
        idTodo: joi.number().integer().positive().required(),
      })
      .options({ allowUnknown: true, stripUnknown: true });
  };

  insertTimeTodo = () => {
    return joi
      .object()
      .keys({
        idTodo: joi.number().integer().positive().required(),
        fromDate: joi.date().less(joi.ref('toDate')).required(),
        toDate: joi.date().max('now').required(),
      })
      .options({ allowUnknown: true, stripUnknown: true });
  };

  updateTimeTodo = () => {
    return joi
      .object()
      .keys({
        idTimesTodo: joi.number().integer().positive().required(),
        idTodo: joi.number().integer().positive().required(),
        fromDate: joi.date().less(joi.ref('toDate')).required(),
        toDate: joi.date().max('now').required(),
      })
      .options({ allowUnknown: true, stripUnknown: true });
  };

  deleteTimeTodo = () => {
    return joi
      .object()
      .keys({
        idTodo: joi.number().integer().positive().required(),
        idsTimesTodo: joi.array().items(joi.number().integer().positive()).min(1).required(),
      })
      .options({ allowUnknown: true, stripUnknown: true });
  };
}

module.exports = new ProjectsValidator();
