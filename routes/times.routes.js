const express = require('express');
const app = express();
const router = express.Router();

const { timesController } = require('../controllers/index.controller');
const { timesMiddleware } = require('../middlewares//index.middleware');

router.get('/:idTodo', timesMiddleware.getTimesTodo, timesController.getTimesTodo);

router.post('/:idTodo', timesMiddleware.workingOnTodo, timesController.workingOnTodo);

router.post('/manual/:idTodo', timesMiddleware.insertTimeTodo, timesController.insertTimeTodoManually);

router.put('/manual/:idTodo/:idTimesTodo', timesMiddleware.updateTimeTodo, timesController.updateTimeTodoManually);

router.delete('/manual', timesMiddleware.deleteTimeTodo, timesController.deleteTimeTodoManually);

app.use('/times', router);

module.exports = app;
