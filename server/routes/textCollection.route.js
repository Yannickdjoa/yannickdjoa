const express = require('express');
const {
  createTextCollection,
  updateTextCollection,
  deleteTextCollection,
  deleteTextCollectionField,
  getSingleTextCollection,
  getAllTextCollection,
} = require('../controllers/textCollection.controller.js');

const textCollectionRouter = express.Router();

textCollectionRouter.post('/create', createTextCollection);
textCollectionRouter.put('/update/:id', updateTextCollection);
textCollectionRouter.delete('/delete/:id', deleteTextCollection);
textCollectionRouter.delete(
  '/deleteTextCollectionField/:id',
  deleteTextCollectionField
);
textCollectionRouter.get('/get/:id', getSingleTextCollection);
textCollectionRouter.get('/get', getAllTextCollection);

module.exports = textCollectionRouter;
