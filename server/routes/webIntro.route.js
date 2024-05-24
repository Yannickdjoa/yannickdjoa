const express = require('express');
const {
  createWebIntro,
  updateWebIntro,
  deleteWebIntro,
  getWebIntro,
} = require('../controllers/webIntro.controller.js');
const webIntroRouter = express.Router();

webIntroRouter.post('/create', createWebIntro);
webIntroRouter.put('/update/:id', updateWebIntro);
webIntroRouter.delete('/deleteWebIntro/:id', deleteWebIntro);
webIntroRouter.get('/get/:id', getWebIntro);

module.exports = webIntroRouter;
