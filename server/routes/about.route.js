const express = require('express');
const {
  createAboutMe,
  updateAboutMe,
  deleteAboutMeField,
  getAboutMe,
} = require('../controllers/about.controller.js');
const aboutMeRouter = express.Router();

aboutMeRouter.post('/create', createAboutMe);
aboutMeRouter.put('/update/:id', updateAboutMe);
aboutMeRouter.delete('/deleteAboutMeField/:id', deleteAboutMeField);
aboutMeRouter.get('/get/:id', getAboutMe);

module.exports = aboutMeRouter;
