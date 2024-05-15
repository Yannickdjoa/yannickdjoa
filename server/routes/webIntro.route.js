const express = require('express');
const {
  createWebIntro,
  updateWebIntro,
  deleteWebIntroField,
  getWebIntro,
} = require('../controllers/webIntro.controller.js');
const webIntroRouter = express.Router();

webIntroRouter.post('/create', createWebIntro);
webIntroRouter.put('/update/:id', updateWebIntro);
webIntroRouter.delete('/deleteWebIntroField/:id', deleteWebIntroField);
webIntroRouter.get('/get/:id', getWebIntro);

module.exports = webIntroRouter;
