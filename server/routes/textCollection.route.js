const express = require('express');
const {
  createTextCollection,
  updateTextCollection,
  deleteTextCollection,
  getSingleTextCollection,
  getAllTextCollection,
} = require('../controllers/textCollection.controller.js');

const textCollectionRouter = express.Router();

textCollectionRouter.post('/create', createTextCollection);
textCollectionRouter.put('/update/:id', updateTextCollection);
textCollectionRouter.delete('/delete/:id', deleteTextCollection);
textCollectionRouter.get('/get/:id', getSingleTextCollection);
textCollectionRouter.get('/getAll', getAllTextCollection);

module.exports = textCollectionRouter;
