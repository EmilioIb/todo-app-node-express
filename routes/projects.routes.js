const express = require('express');
const app = express();
const router = express.Router();

const { projectsController } = require('../controllers/index.controller');
const { projectsMiddleware } = require('../middlewares//index.middleware');

router.get('/', projectsController.getProjects);

router.post('/', projectsMiddleware.insertProject, projectsController.insertProject);

router.put('/:idProject', projectsMiddleware.validIdProject, projectsMiddleware.insertProject, projectsController.updateProject);

router.delete('/', projectsMiddleware.deleteProjects, projectsController.deleteProject);

app.use('/projects', router);

module.exports = app;
