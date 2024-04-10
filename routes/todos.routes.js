const express = require('express');
const app = express();
const router = express.Router();

const { todosController } = require('../controllers/index.controller');
const { todosMiddleware } = require('../middlewares//index.middleware');

router.get('/', todosController.getTodos);

router.post('/', todosMiddleware.insertTodo, todosController.insertTodo);

router.put('/:idTodo', todosMiddleware.updateTodo, todosController.updateTodo);

router.delete('/', todosMiddleware.deleteTodos, todosController.deleteTodo);

router.put('/status/:idTodo/', todosMiddleware.completeTodo, todosController.completeTodo);

app.use('/todos', router);

module.exports = app;
