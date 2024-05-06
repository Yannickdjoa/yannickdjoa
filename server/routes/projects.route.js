const express = require('express');

const projectsRouter = express.Router();

projectsRouter.post('/create', createBio);
projectsRouter.put('/update/:id', updateBio);
projectsRouter.delete('/delete/:id', deleteBio);
projectsRouter.delete('/deleteField/:id', deleteBioField);
projectsRouter.get('/get/:id', getBio);
projectsRouter.get('/get', getBio);

modeule.exports = projectsRouter;
