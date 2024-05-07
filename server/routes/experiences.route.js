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
experiencesRouter.put('/update', updateExperience);
experiencesRouter.delete('/delete', deleteExperience);
experiencesRouter.delete('/deleteExperienceField', deleteExperienceField);
experiencesRouter.get('/getSingleExperience', getSingleExperience);
experiencesRouter.get('/getAllExperience', getAllExperience);
module.exports = experiencesRouter;
