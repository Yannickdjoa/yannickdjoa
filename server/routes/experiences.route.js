const express = require('express');
const {
  updateExperience,
  deleteExperience,
  getSingleExperience,
  getAllExperience,
  deleteExperienceField,
  createExperience,
} = require('../controllers/experience.controller');

const experiencesRouter = express.Router();

experiencesRouter.post('/create', createExperience);
experiencesRouter.put('/update/:id', updateExperience);
experiencesRouter.delete('/delete/:id', deleteExperience);
experiencesRouter.get('/get/:id', getSingleExperience);
experiencesRouter.get('/get', getAllExperience);

module.exports = experiencesRouter;
