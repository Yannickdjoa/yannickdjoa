const express = require('express');
const {
  updateBio,
  createBio,
  deleteBio,
  getBio,
} = require('../controllers/bio.controller.js');

const bioRouter = express.Router();

bioRouter.put('/update/:id', updateBio);
bioRouter.post('/create', createBio);
bioRouter.delete('/delete/:id', deleteBio);
bioRouter.get('/get/:id', getBio);

module.exports = bioRouter;
