const joi = require('joi');

class TodosValidator {
  getTodos = () => {
    return joi
      .object()
      .keys({
        timeOffset: joi.number().required(),
      })
      .options({ allowUnknown: true, stripUnknown: true });
  };

  insertTodo = () => {
    return joi
      .object()
      .keys({
        name: joi.string().required(),
        idProject: joi.number().integer().positive().required(),
      })
      .options({ allowUnknown: true, stripUnknown: true });
  };

  updateTodo = () => {
    return joi
      .object()
      .keys({
        name: joi.string().required(),
        idProject: joi.number().integer().positive().required(),
        idTodo: joi.number().integer().positive().required(),
      })
      .options({ allowUnknown: true, stripUnknown: true });
  };

  deleteTodos = () => {
    return joi
      .object()
      .keys({
        idsTodos: joi.array().items(joi.number().integer().positive()).min(1).required(),
      })
      .options({ allowUnknown: true, stripUnknown: true });
  };

  completeTodo = () => {
    return joi
      .object()
      .keys({
        idTodo: joi.number().integer().positive().required(),
      })
      .options({ allowUnknown: true, stripUnknown: true });
  };
}

module.exports = new TodosValidator();
