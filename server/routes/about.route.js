const express = require('express');
const {
  createAboutMe,
  updateAboutMe,
  deleteAboutMe,
  getAboutMe,
} = require('../controllers/about.controller.js');
const aboutMeRouter = express.Router();

aboutMeRouter.post('/create', createAboutMe);
aboutMeRouter.put('/update/:id', updateAboutMe);
aboutMeRouter.delete('/deleteAboutMe/:id', deleteAboutMe);
aboutMeRouter.get('/get/:id', getAboutMe);

module.exports = aboutMeRouter;
