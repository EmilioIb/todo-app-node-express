const express = require('express');
const app = express();
const router = express.Router();

const { reportsController } = require('../controllers/index.controller');
const { reportsMiddleware } = require('../middlewares//index.middleware');

router.get('/uncompletedTodos', reportsMiddleware.uncompletedTodos, reportsController.uncompletedTodos);

router.get('/allTodos', reportsMiddleware.allTodos, reportsController.allTodos);

router.get('/projectTodos', reportsMiddleware.projectTodos, reportsController.projectTodos);

app.use('/reports', router);

module.exports = app;
