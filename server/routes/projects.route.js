const express = require('express');
const { createProject } = require('../controllers/projects.controller.js');
const projectsRouter = express.Router();

projectsRouter.post('/create', createProject);
// projectsRouter.put('/update/:id', updateBio);
// projectsRouter.delete('/delete/:id', deleteBio);
// projectsRouter.delete('/deleteField/:id', deleteBioField);
// projectsRouter.get('/get/:id', getBio);
// projectsRouter.get('/get', getBio);

module.exports = projectsRouter;
