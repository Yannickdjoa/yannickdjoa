const express = require('express');
const {
  createServices,
  updateServices,
  deleteServices,
  getSingleServices,
  getAllServices,
} = require('../controllers/services.controller.js');

const servicesRouter = express.Router();

servicesRouter.post('/create', createServices);
servicesRouter.put('/update/:id', updateServices);
servicesRouter.delete('/delete/:id', deleteServices);
servicesRouter.get('/get/:id', getSingleServices);
servicesRouter.get('/getAll', getAllServices);

module.exports = servicesRouter;
