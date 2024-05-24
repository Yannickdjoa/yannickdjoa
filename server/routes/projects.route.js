const express = require('express');
const {
  createProject,
  updateProject,
  deleteProject,
  getSingleProject,
  getAllProjects,
} = require('../controllers/projects.controller.js');
const projectsRouter = express.Router();

projectsRouter.post('/create', createProject);
projectsRouter.put('/update/:id', updateProject);
projectsRouter.delete('/delete/:id', deleteProject);
projectsRouter.get('/get/:id', getSingleProject);
projectsRouter.get('/getAll', getAllProjects);

module.exports = projectsRouter;
