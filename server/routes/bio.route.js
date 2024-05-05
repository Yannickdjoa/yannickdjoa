const express = require('express');
const {
  updateBio,
  createBio,
  deleteBio,
  getBio,
  deleteBioField,
} = require('../controllers/bio.controller.js');

const bioRouter = express.Router();

bioRouter.put('/update/:id', updateBio);
bioRouter.post('/create', createBio);
bioRouter.delete('/delete/:id', deleteBio);
bioRouter.delete('/deleteField/:id', deleteBioField);
bioRouter.get('/get/:id', getBio);
// bioRouter.get('/get', getBio);

module.exports = bioRouter;
