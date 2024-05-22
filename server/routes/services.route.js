const express = require('express');
const {
  createNavigation,
  updateNavigation,
  deleteNavigation,
  deleteNavigationField,
  getSingleNavigation,
  getAllNavigation,
} = require('../controllers/workOffer.controller.js');

const navigationRouter = express.Router();

navigationRouter.post('/create', createNavigation);
navigationRouter.put('/update/:id', updateNavigation);
navigationRouter.delete('/delete/:id', deleteNavigation);
navigationRouter.delete('/deleteNavigationField/:id', deleteNavigationField);
navigationRouter.get('/getSingleNavigation/:id', getSingleNavigation);
navigationRouter.get('/get', getAllNavigation);

module.exports = navigationRouter;
