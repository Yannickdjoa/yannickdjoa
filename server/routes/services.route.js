const express = require('express');
const {
  createServices,
  updateServices,
  deleteServices,
  deleteServicesField,
  getSingleServices,
  getAllServices,
} = require('../controllers/services.controller.js');

const servicesRouter = express.Router();

servicesRouter.post('/create', createServices);
servicesRouter.put('/update/:id', updateServices);
servicesRouter.delete('/delete/:id', deleteServices);
servicesRouter.delete('/deleteservicesField/:id', deleteServicesField);
servicesRouter.get('/getSingleservices/:id', getSingleServices);
servicesRouter.get('/get', getAllServices);

module.exports = servicesRouter;
